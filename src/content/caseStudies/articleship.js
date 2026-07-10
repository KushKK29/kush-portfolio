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
    "AI-powered article generation SaaS with an async job queue and multi-provider LLM failover.",
  stack: [
    "FastAPI",
    "MongoDB",
    "Next.js 14",
    "Tailwind",
    "Gemini",
    "Bifrost",
    "Render",
  ],
  sections: [
    {
      type: "problem",
      content:
        "Long-form article generation with LLMs breaks in a naive implementation: a single generation takes 60–120 seconds, which blows past HTTP timeout budgets; relying on one provider means one outage or rate-limit kills the product; and models happily fabricate statistics when asked to write authoritative content. ArticleShip needed to produce publish-ready, sourced articles reliably enough to charge for.",
    },
    {
      type: "architecture",
      diagram: "/diagrams/articleship.svg",
      content:
        "The Next.js 14 frontend submits a generation request to the FastAPI backend, which writes a job document into MongoDB and returns immediately — MongoDB doubles as the job queue, so there is no Redis or Celery to operate. A background worker claims pending jobs, runs DDGS web search to ground the article in real sources, and calls the LLM through Bifrost, a gateway that routes to Gemini first and fails over to backup providers automatically. The frontend polls job status until the article is ready.",
    },
    {
      type: "decisions",
      items: [
        {
          decision:
            "Switched from synchronous generation to an async MongoDB-backed job queue",
          why: "Generation regularly exceeded HTTP timeout budgets, so requests died mid-flight. A jobs collection with status transitions (pending → running → done/failed) made generation survivable across timeouts and server restarts — and since MongoDB was already the primary datastore, it cost zero new infrastructure.",
        },
        {
          decision: "Routed all LLM calls through Bifrost instead of calling Gemini directly",
          why: "A single provider is a single point of failure. Bifrost gives multi-provider failover and unified request logging without scattering retry logic through application code.",
        },
        {
          decision: "Skipped Postgres on the Bifrost deploy",
          why: "Render's free-tier Postgres expires after 30 days, which would have silently killed the gateway a month in. File-based config avoided a dependency with a built-in death clock.",
        },
        {
          decision: "Grounded generation with DDGS web search before writing",
          why: "Retrieval-first generation lets the prompt demand claims backed by the fetched sources, which is the structural fix for fabricated statistics — prompt-only 'don't make things up' instructions were not enough.",
        },
      ],
    },
    {
      type: "challenges",
      items: [
        {
          problem: "Generated articles contained fabricated statistics presented as fact",
          fix: "Moved to retrieval-grounded generation: DDGS search results are injected into the prompt and the model is constrained to only cite numbers present in the sources. Unsourced numeric claims are stripped in a validation pass.",
        },
        {
          problem: "Long articles came back as truncated, unparseable JSON",
          fix: "Root cause was a missing max_output_tokens on the provider call — the default budget cut the response mid-object. Set an explicit token budget sized to the article schema and added a parse step that detects truncation instead of failing opaquely.",
        },
        {
          problem: "The DDGS search fallback path silently returned no results",
          fix: "The fallback branch was swallowing exceptions and returning an empty list, so articles were generated ungrounded without any signal. Fixed the fallback to propagate failure into the job record so a grounding failure is visible, not silent.",
        },
        {
          problem: "Worker crashed with a NameError under a rarely-hit branch",
          fix: "A variable was defined inside one conditional branch but referenced after the conditional — classic scoping bug that only fired on the uncommon path. Hoisted the definition and added a regression test for that branch.",
        },
        {
          problem: "Articles overshot the requested outline with extra headings",
          fix: "The model kept inventing sections beyond the outline. Fixed by hard-capping headings against the outline in post-processing and trimming overflow instead of trusting the prompt alone.",
        },
      ],
    },
    {
      type: "evidence",
      items: [
        { label: "Architecture diagram", asset: "/diagrams/articleship.svg" },
        { label: "Repo (private — request access)", url: null },
      ],
    },
    {
      type: "outcome",
      content:
        "An end-to-end async pipeline where jobs survive restarts and timeouts, generation keeps working through provider outages via Bifrost failover, and articles cite real fetched sources instead of invented statistics. The debugging trail — silent fallbacks, token budgets, scoping bugs — is exactly the operational surface a real LLM product lives on.",
    },
  ],
};
