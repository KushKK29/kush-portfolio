// Case study content. Edit freely — the renderer only cares about the shapes,
// not the prose. Add a new case study by copying this file shape into a new
// file in this folder; it is picked up automatically.
export default {
  slug: "articleship",
  type: "project",
  order: 1,
  title: "ArticleShip",
  role: "Founder / Full-stack",
  timeframe: "2025 – Present",
  oneLiner:
    "A full-stack AI article platform: MongoDB-backed job queue, 4-provider LLM failover, batch generation, and Stripe billing.",
  stack: [
    "FastAPI",
    "MongoDB",
    "Next.js 14",
    "Gemini",
    "OpenRouter",
    "python-jose",
    "Stripe",
  ],
  sections: [
    {
      type: "problem",
      content:
        "Long-form article generation with LLMs breaks in a naive implementation: a single generation takes long enough to blow past HTTP timeout budgets, relying on one provider means one rate-limit or outage kills the product, and a crashed worker mid-job silently loses that job forever. ArticleShip needed a pipeline that survives restarts, survives provider outages, and still lets someone submit 20 topics at once and walk away.",
    },
    {
      type: "architecture",
      diagram: "/diagrams/articleship.svg",
      content:
        "The Next.js 14 frontend talks to a FastAPI backend across five API areas — auth, generation (keyword/outline/article), jobs and batches, an article CMS, and billing. A generation request becomes a job document in MongoDB, which doubles as the job queue. A separate worker process claims jobs atomically with find_one_and_update (so two workers can't grab the same job), runs the pipeline — keyword research via live web search, outline, section drafting, structured mapping, image placement, HTML conversion — and calls the LLM through a 4-provider failover chain.",
    },
    {
      type: "decisions",
      items: [
        {
          decision: "Built the job queue on MongoDB instead of adding Redis or Celery",
          why: "MongoDB was already the primary datastore. A jobs collection with atomic find_one_and_update claims gets queue semantics — no double-processing, no new infrastructure to operate.",
        },
        {
          decision: "Chained four LLM providers instead of calling Gemini directly",
          why: "Primary is Gemini 3 Flash; it fails over to OpenRouter, then NVIDIA NIM (Kimi k2.6), then Qwen. Rate-limit (429) and overload (503) errors trigger retry with linear backoff before falling to the next provider — a single provider's bad day doesn't take the product down.",
        },
        {
          decision: "Reclaim jobs stuck in processing for over 20 minutes, capped at 2 attempts",
          why: "A worker can crash or hang mid-job. Treating anything stuck past 20 minutes as stale and letting another worker reclaim it (up to 2 tries) means a dead process loses time, not the job.",
        },
        {
          decision: "Doubled the token limit on truncated output instead of just retrying",
          why: "A truncated JSON response isn't a transient failure to retry blind — it's a budget problem. Detecting truncation and retrying with double max_output_tokens fixes the actual cause instead of hoping a retry gets lucky.",
        },
      ],
    },
    {
      type: "challenges",
      items: [
        {
          problem: "Batch jobs needed to submit up to 20 topics without hammering providers or finishing all at once",
          fix: "Added optional stagger_minutes to space execution out over time, plus scheduled_at to delay a batch to a future time — so a batch of 20 doesn't fire as 20 simultaneous LLM calls.",
        },
        {
          problem: "No visibility into what a job actually cost to run",
          fix: "Each job logs LLM call counts and image-generation metrics into a job_cost record, so cost is attributable per job instead of inferred from a monthly provider bill.",
        },
        {
          problem: "Email-based signup needed to be secure without adding a password-reset support burden",
          fix: "Signup sends an email OTP; verify-otp exchanges the code for a JWT access token (python-jose), and login sets a refresh cookie separately. Passwords are hashed with bcrypt — no plaintext, no SMS dependency.",
        },
      ],
    },
    {
      type: "evidence",
      items: [
        { label: "Architecture diagram", asset: "/diagrams/articleship.svg" },
        { label: "Live", url: "https://article-ai-murex.vercel.app/" },
        { label: "GitHub", url: "https://github.com/KushKK29/Article.ai" },
      ],
    },
    {
      type: "outcome",
      content:
        "An end-to-end pipeline where jobs survive worker crashes and restarts via the 20-minute stale-reclaim, generation keeps working through provider outages across a 4-deep failover chain, and batch submissions of up to 20 topics run staggered or scheduled instead of all at once. Billing is wired through Stripe, auth through OTP + JWT, and every job's LLM and image cost is tracked individually.",
    },
  ],
};
