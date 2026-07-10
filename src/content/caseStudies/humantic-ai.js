export default {
  slug: "humantic-ai",
  type: "experience",
  order: 2,
  title: "Humantic AI — Software Engineer Intern",
  role: "Software Engineer Intern",
  timeframe: "Jan 2026 – Present",
  oneLiner:
    "Onboarding flows for two AI agents, an LLM fallback gateway, and automated KPI reporting on AWS.",
  stack: [
    "Angular",
    "React",
    "Next.js",
    "Python",
    "FastAPI",
    "AWS CloudWatch",
    "Bifrost",
    "SCSS",
  ],
  sections: [
    {
      type: "problem",
      content:
        "Humantic AI ships buyer-intelligence agents (Agent PI and Agent Miia) to sales teams. When I joined, new users landed in the product without a guided path, LLM calls depended on a single provider, and the team's KPIs were assembled by hand from raw logs — three separate drags on activation, reliability, and visibility.",
    },
    {
      type: "architecture",
      diagram: "/diagrams/humantic-ai.svg",
      content:
        "My work touched three layers: the product frontend (onboarding flows and the Compatibility section in the full-profile view), the LLM serving path (a Bifrost gateway between backend services and providers, so a provider failure fails over instead of failing the feature), and observability (CloudWatch metrics piped into automated KPI reports instead of manual collection).",
    },
    {
      type: "decisions",
      items: [
        {
          decision:
            "Built onboarding as an integrated in-product flow rather than docs or emails",
          why: "Before: users hit a full-featured dashboard cold and activation depended on sales hand-holding. A guided first-run flow for Agent PI and Agent Miia gets users to their first insight inside the product itself.",
        },
        {
          decision: "Put Bifrost in front of LLM providers as a fallback gateway",
          why: "Agent features are only as reliable as the model behind them. Centralizing provider routing in a gateway means failover, logging, and provider swaps happen in one place instead of per-feature.",
        },
        {
          decision: "Automated KPI collection with CloudWatch instead of manual pulls",
          why: "Before: engineers assembled usage and health numbers by hand, so reporting was slow and inconsistent. Metrics-as-code makes the numbers continuous and trustworthy.",
        },
        {
          decision: "Prototyped an agent workflow with the Claude Agent SDK as a POC",
          why: "Cheapest way to evaluate whether an SDK-managed agent loop fit the product before committing roadmap time to it.",
        },
      ],
    },
    {
      type: "challenges",
      items: [
        {
          problem:
            "Two agents (PI and Miia) with different personas needed onboarding without forking the flow",
          fix: "Built the flow once with agent-specific configuration for copy and steps, so both agents share the same tested path.",
        },
        {
          problem:
            "The Compatibility section had to summarize personality-fit data inside an already dense full-profile menu",
          fix: "Designed it as a self-contained section with a clear visual hierarchy, so the fit signal reads at a glance without crowding the rest of the profile.",
        },
      ],
    },
    {
      type: "evidence",
      items: [
        { label: "Humantic AI", url: "https://humantic.ai" },
        { label: "Architecture diagram", asset: "/diagrams/humantic-ai.svg" },
      ],
    },
    {
      type: "outcome",
      content:
        "New users of both agents now get a guided first-run experience, LLM-backed features degrade gracefully through the Bifrost gateway instead of erroring on provider issues, and the team reads KPIs from automated CloudWatch reporting instead of assembling them by hand.",
    },
  ],
};
