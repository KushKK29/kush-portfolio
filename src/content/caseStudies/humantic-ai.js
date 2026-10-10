export default {
  slug: "humantic-ai",
  type: "experience",
  order: 2,
  title: "Humantic AI — Software Engineer Intern",
  role: "Software Engineer Intern",
  timeframe: "Jan 2026 – Present",
  oneLiner:
    "Backend-to-frontend feature delivery across 15 repos — onboarding, auth, an MCP tool surface, observability, fraud prevention, and an original Agents SDK pipeline POC.",
  stack: [
    "Angular",
    "React",
    "Next.js",
    "Python",
    "FastAPI",
    "AWS CloudWatch",
    "Bifrost",
    "OpenAI Agents SDK",
    "MongoDB",
    "Grafana / Loki",
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
          decision:
            "Rebuilt the production MIIA report pipeline from scratch on the OpenAI Agents SDK, with vendored production prompts and multi-provider LLM routing",
          why: "Production's report pipeline runs on a hand-built SQS queue plus custom harness — heavyweight to prototype against. The POC reproduces all 6 pipeline stages on a standard agent-orchestration SDK, copies in the real production prompts for a fair comparison, and routes across OpenAI/DeepSeek/Kimi/Qwen so the same pipeline can be A/B'd across providers without touching production infra.",
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
        {
          problem:
            "The browser extension needed to integrate with four different CRMs (Salesforce, HubSpot, Zoho, Outlook) without a shared data model between them",
          fix: "Built per-CRM adapters for domain lookup, email personalization, and meeting dedup, each handling that CRM's own quirks (Zoho's company-page validation, Salesforce's missing Website field, HubSpot's editor-scoping) behind one consistent extension UI.",
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
      type: "timeline",
      items: [
        {
          range: "Jan 2026",
          title: "Backend Foundations",
          repos: "humantic_apis",
          impact: "medium",
          insight: "First owned backend-wide flows end to end, not just bugfixes.",
          tasks: [
            ["01-22", "GDPR email threshold", "Outbound-send threshold was too low; raised it so legitimate volume wasn't throttled."],
            ["01-23 → 01-29", "Auto-fetch subscription ID", "subsID lookup required manual passing; automated server-side resolution plus a clear error when an org has none."],
            ["02-22 → 03-24", "PRD onboarding backend", "Multi-week backend build for a new onboarding flow; fast-followed a PI/Miia report-count bug after merge."],
          ],
        },
        {
          range: "Feb–Apr",
          title: "Signup / Onboarding Hardening",
          repos: "humantic_apis · app-dashboard · humantic-website",
          impact: "high",
          insight: "Same fix landing across backend + 2 frontends — learned to trace one root cause through every surface it touches.",
          tasks: [
            ["03-05/06", "iCloud domain block", "Disposable-feeling iCloud addresses abusing free-tier limits; blocked at signup/validation layer (mirrored in 3 repos)."],
            ["03-19 → 03-26", "Custom report save bug", "Saving a custom report silently overwrote prior data in some cases; fixed save logic + added report-status storage."],
            ["02-04 → 03-23", "Onboarding flow 3/4/5", "Multi-step onboarding redesign shipped incrementally; fixed designation bugs, re-engagement issue, sample-report mapping along the way."],
            ["03-04", "PI/Miia report count bug", "Wrong report count shown during onboarding; fixed same day on both backend and frontend."],
          ],
        },
        {
          range: "Mar–Apr",
          title: "Notifications & Observability — Round 1",
          repos: "humantic_apis · agents",
          impact: "medium",
          insight: "Moved from 'fix the bug' to 'make the system observable so bugs surface on their own.'",
          tasks: [
            ["03-25 → 04-06", "Prospect activity Slack channel", "No visibility into prospect activity; added dedicated channel, extended to public-website-sourced activity."],
            ["04-08 → 04-09", "Multi-instance notification dedup", "Multiple service instances could double-fire the same alert; added cross-instance dedup."],
            ["04-15 → 04-17", "Separate debug/error channels", "Debug and error alerts mixed in one channel; split them, moved webhook URL out of source, added monitoring link to error messages."],
          ],
        },
        {
          range: "May–Jul",
          title: "Cross-Repo UI Features",
          repos: "app-dashboard · humantic_apis · humantic_backend_api_v2",
          impact: "medium",
          insight: "First 'ship the data contract, then the UI that depends on it' pattern — repeated later for intent signals, Arista overrides.",
          tasks: [
            ["05-09 → 05-27", "Research depth (API)", "Reports didn't expose research thoroughness; added field to API header + emails."],
            ["05-05 → 05-11", "Research depth (dashboard)", "Consumed the new API field to surface research depth on report header/PDF."],
            ["06-04 → 06-08", "Domain-save routes", "Resolved-domain save had routing gaps and mismatch bugs across apis + backend_v2; fixed in both."],
          ],
        },
        {
          range: "Jul–Oct",
          title: "Auth & Identity",
          repos: "humantic_apis · payment_website · humantic-dashboard",
          impact: "high",
          insight: "Owned a full auth surface: email OTP, OAuth 2.1, third-party (Salesforce) auth, and MCP-client auth — across 3 repos, backend to UI.",
          tasks: [
            ["07-02 → 07-14", "OTP verification route + form", "Built OTP route with destroy/expiry logic plus the OTP signup form."],
            ["07-08 → 07-14", "OAuth 2.1 update", "Older OAuth spec broke compatibility with newer MCP/connector clients; updated to 2.1."],
            ["07-30 → 09-18", "Salesforce auth fixes", "Token column wrong type, expiry-check mishandled dates; migrated to TEXT, fixed expiry logic, fixed boolean filters + retry logic."],
            ["10-07", "Pre-login OTP signup", "New dashboard repo had no signup flow; built full pre-login OTP signup end-to-end as its first feature."],
          ],
        },
        {
          range: "Jun–Aug",
          title: "Dashboard UI Depth",
          repos: "app-dashboard",
          impact: "medium",
          insight: "Largest sustained UI ownership stretch — one feature (intent signals) iterated across 4+ PRs based on review.",
          tasks: [
            ["06-17 → 06-24", "New dashboard UI + logo", "Visual refresh plus domain-confirmation step added to signal modal."],
            ["07-23 → 08-18", "Intent signal integration", "No way to represent intent-category signals distinctly; added subtype labels/icons/category mapping, iterated across review rounds."],
            ["08-10 → 08-18", "Public profile PDF/share refactor", "Component structure didn't support PDF/share cleanly; refactored and implemented both."],
          ],
        },
        {
          range: "Jul–Oct",
          title: "MCP Product Surface",
          repos: "mcp",
          impact: "high",
          insight: "Owned a full MCP tool end to end: schema design, breaking-change migration, and client-compatibility tradeoffs.",
          tasks: [
            ["07-23 → 08-04", "OAuth connectivity", "No OAuth flow for MCP client connections; built the layer so clients authenticate against Humantic accounts."],
            ["08-18 → 08-25", "PDF download (token-based)", "No way to download PI/Miia reports as PDF; built opaque short-lived download tokens + PDF handler, with a self-check script."],
            ["08-19 → 08-25", "content_personalize simplification", "Confusing dual fields and a dead response type; collapsed fields, removed dead type, renamed tool — a deliberate breaking change."],
            ["09-09", "Async web-insights polling", "Profile fetch blocked synchronously on enrichment; converted to async polling, removed manual sleep helper."],
            ["09-23", "Reverted citation compaction", "Citation-shortening function broke Copilot's link rendering; reverted same day to restore compatibility."],
          ],
        },
        {
          range: "Sep",
          title: "Infrastructure / Observability — Round 2",
          repos: "mcp · humantic_backend_api_v2 · agents",
          impact: "high",
          insight: "Went from 'add a Slack alert' (round 1) to building the actual observability stack — dashboards + alerting infra — from scratch.",
          tasks: [
            ["09-09", "Grafana Alloy → Loki pipeline", "No centralized logging/alerting for MCP; built config.alloy log shipping, Grafana dashboard, local docker-compose stack, alert rules, structured JSON logs, alert throttling."],
            ["09-17 → 09-19", "Arista tech-stack categorization", "Generic categorization didn't fit Arista's hardware/networking catalog; added seller-specific categories, async GPT-5.6-Luna call, fixed category placement rules."],
          ],
        },
        {
          range: "Sep–Oct",
          title: "Trust & Safety / Security",
          repos: "humantic_apis · humantic-dashboard",
          impact: "high",
          insight: "Most recent focus: moved signup safety from ad-hoc domain blocks to a maintainable, DB-backed, tested fraud-prevention layer.",
          tasks: [
            ["09-18", "Email fraud check (ffraud) — first pass", "No fraud/disposable-domain validation at signup; added validation + fraud-check function with tests."],
            ["09-23 → 10-07", "DB-backed domain blocking", "Fraud check was logic-only; extended to DB-backed block-list manageable without a deploy."],
            ["10-07", "Final signup integration", "Tied fraud-check/domain-block work directly into live signup for real-time validation."],
          ],
        },
        {
          range: "Apr–Oct",
          title: "Browser Extension / CRM Integrations",
          repos: "chrome_extension",
          impact: "medium",
          insight: "Ran in parallel with everything else — owned the extension's CRM-integration surface (Salesforce, HubSpot, Zoho, Outlook) end to end, shipped 2 manifest version bumps.",
          tasks: [
            ["07-14 → 08-09", "LinkedIn URL fix (custom fields)", "Vanity/custom LinkedIn URL formats weren't parsed correctly, fetching the wrong profile; added custom-field support plus a live storage-change listener for username changes."],
            ["08-13 → 08-17", "Salesforce email personalization", "No way to personalize/generate an email from within Salesforce; built dynamic recipient handling in the composer, account-ID lookup, and a hover-styled generation dropdown."],
            ["08-24", "Zoho + Salesforce domain fallback", "Zoho company-page validation failed for some accounts, Salesforce accounts without a Website field had no fallback; fixed both, shipped alongside a new quick-account-insights feature and two manifest version bumps."],
            ["09-28", "Meeting deduplication logic", "Calendar sync created duplicate meeting entries from multiple sources; added dedup that retains the most complete version of each event."],
          ],
        },
        {
          range: "Scattered",
          title: "Supporting Services",
          repos: "humantic_meeting_insights · humantic_user_profile_apis · humantic_internal",
          impact: "low",
          insight: "Kept the supporting services — compliance scanning, calendar sync, internal tooling — healthy alongside the main feature work.",
          tasks: [
            ["02-05 → 03-11", "CloudWatch monitoring + hardcoded-IP cleanup", "No visibility into Google Calendar event processing, plus hardcoded IPs committed in multiple places; added monitoring and removed the hardcoded values."],
            ["08-31 → 09-11", "Outlook calendar pagination", "Outlook event fetching had no pagination, silently missing events beyond the first page; added proper pagination and extended the participant-processing window to 7 days ahead."],
            ["07-17", "Sprinto-Slscan compliance-scan auth fix", "A scheduled SOC2 compliance scan was failing with 401s on a deprecated auth method; upgraded to API-token auth to stop the recurring failures."],
          ],
        },
        {
          range: "Oct",
          title: "Agent-SDK Architecture Exploration",
          repos: "miia-agent-sdk-poc",
          impact: "high",
          insight: "The one piece of work that isn't a bugfix or incremental feature — original exploration of whether a production AI pipeline could be rebuilt on a different orchestration primitive.",
          tasks: [
            ["—", "Full MIIA pipeline on OpenAI Agents SDK", "Production's report pipeline runs on a hand-built SQS queue + custom harness. Rebuilt all 6 stages (scope → research → compression → extraction → report → insight brief) on the OpenAI Agents SDK instead, with a FastAPI trigger endpoint mirroring the production API shape."],
            ["—", "Vendored production prompts for fidelity", "Copied the actual production prompts in as-is rather than placeholders, so the POC's output quality is directly comparable to what's running live."],
            ["—", "Multi-provider LLM routing", "Wired the same pipeline to run on OpenAI, DeepSeek, Kimi, and Qwen via OpenAI-compatible APIs, selectable per-run — non-OpenAI providers work with zero OpenAI key, using keyword-based retrieval instead of embeddings."],
          ],
        },
      ],
    },
    {
      type: "outcome",
      content:
        "New users of both agents now get a guided first-run experience, LLM-backed features degrade gracefully through the Bifrost gateway instead of erroring on provider issues, and the team reads KPIs from automated CloudWatch reporting instead of assembling them by hand. Beyond the product surface, signup is protected by a DB-backed fraud layer, MCP ships as a full tool surface with its own Grafana/Loki observability stack, the browser extension owns CRM integration across four platforms, and the Agents SDK POC gives the team a provider-agnostic reference for how the core report pipeline could evolve.",
    },
  ],
};
