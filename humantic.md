# Kush Goel — Detailed Task Summary Across Repos

Source: git log (author "Kush Goel", all branches), repos under `~/HumanticAI_Work`.
Each entry: date range worked, task, elaborated problem statement (what was broken/missing, why it mattered, what was done).

---

## Portfolio Walkthrough — Journey Across the Stack (Jan 2026 → Oct 2026)

A single thread through 15 repos, roughly chronological, showing growth from backend bug-fixing → cross-stack feature ownership → browser-extension CRM integrations → infrastructure/observability → security → original agent-architecture exploration.

```
Jan 2026                                                                          Oct 2026
  │                                                                                  │
  ▼                                                                                  ▼
[1] BACKEND FOUNDATIONS (humantic_apis)
    GDPR email threshold → auto-fetch subsID → PRD onboarding backend
    └─ first owned backend-wide flows end to end, not just bugfixes
         │
         ▼
[2] SIGNUP/ONBOARDING HARDENING (humantic_apis + app-dashboard + humantic-website, Feb–Apr)
    iCloud domain block (3 repos) → custom report save fix → onboarding flow 3/4/5
    (app-dashboard) → designation UI → PI/Miia report count bug (fixed same day,
    backend + frontend) → compatibility section, designation section (humantic-website)
    └─ same fix landing across backend + 2 frontends → learned to trace one
       root cause through every surface it touches
         │
         ▼
[3] NOTIFICATIONS & OBSERVABILITY, ROUND 1 (humantic_apis + agents, Mar–Apr)
    Prospect activity channel → multi-instance notification dedup → external signal
    Slack alerts → separate debug/error channels (agents) → level-based error alerting
    └─ moved from "fix the bug" to "make the system observable so bugs surface
       on their own"
         │
         ▼
[4] CROSS-REPO UI FEATURES (app-dashboard + humantic_apis + humantic_backend_api_v2, May–Jul)
    Research depth: shipped backend field (humantic_apis) → consumed in dashboard
    header/PDF (app-dashboard), same feature two repos
    LI enrichment/dedup → domain-save routes (3 repos, same bug class) →
    recent news link, Vertex AI redirect handling (backend_v2)
    └─ first "ship the data contract, then the UI that depends on it" pattern —
       repeated later for intent signals, Arista overrides
         │
         ▼
[5] AUTH & IDENTITY (humantic_apis + payment_website + humantic-dashboard, Jul–Oct)
    OTP verification route (humantic_apis) → OTP form (payment_website) →
    OAuth 2.1 update → Salesforce auth (token type fix, expiry bug, Sandbox option,
    consent-screen async refactor, hasPriorGrant fix) → MCP OAuth connectivity →
    pre-login OTP signup, new repo (humantic-dashboard)
    └─ owned a full auth surface: email OTP, OAuth 2.1, third-party (Salesforce)
       auth, and MCP-client auth — across 3 repos, backend to UI
         │
         ▼
[6] DASHBOARD UI DEPTH (app-dashboard, Jun–Aug)
    New dashboard UI/logo → infographics UI → new PI dashboard + mobile Buying
    Committee Map → intent signal integration (multi-round, iterated on feedback) →
    Apollo/Bombora logo fixes → public profile PDF/share refactor
    └─ largest sustained UI ownership stretch — one feature (intent signals)
       iterated across 4+ PRs based on review
         │
         ▼
[7] MCP PRODUCT SURFACE (mcp, Jul–Oct)
    OAuth connectivity → PDF download (token-based, secure links) → Miia report
    UI parity with dashboard → branding cleanup → content_personalize tool
    simplification (breaking change, shipped deliberately) → async web-insights
    polling → PiSearch tool → rate-limit exemption (two-sided fix with
    humantic_apis) → Copilot citation compatibility (reverted own change
    after it broke a client)
    └─ owned a full MCP tool end to end: schema design, breaking-change
       migration, and client-compatibility tradeoffs
         │
         ▼
[8] INFRASTRUCTURE / OBSERVABILITY, ROUND 2 (mcp + humantic_backend_api_v2, Sep)
    Grafana Alloy → Loki logging pipeline for MCP (dashboards, alert rules,
    structured JSON logs, alert throttling) → Arista seller-specific tech-stack
    categorization (backend_v2 + agents, same feature two repos)
    └─ went from "add a Slack alert" (round 1) to building the actual
       observability stack (dashboards + alerting infra) from scratch
         │
         ▼
[9] TRUST & SAFETY / SECURITY (humantic_apis + humantic-dashboard, Sep–Oct)
    Email fraud check (ffraud) + tests → DB-backed domain blocking → sell/upsell
    Slack channel → final signup integration (fraud check wired live into signup)
    └─ most recent focus: moved signup safety from ad-hoc domain blocks (round 2)
       to a maintainable, DB-backed, tested fraud-prevention layer
         │
         ▼
[10] BROWSER EXTENSION / CRM INTEGRATIONS (chrome_extension, Apr–Oct, ongoing throughout)
    Meeting-insight fixes → LinkedIn URL parsing (custom fields, own-profile detection)
    → Salesforce email personalization (composer, recipient handling, account lookup)
    → Zoho/Salesforce domain-retrieval fallback → quick account insights feature
    → HubSpot draft-editor scoping → meeting dedup logic → structural refactor
    └─ ran in parallel with everything else — owned the extension's CRM-integration
       surface (Salesforce, HubSpot, Zoho, Outlook) end to end, shipped 2 manifest
       version bumps
         │
         ▼
[11] SUPPORTING SERVICES (humantic_meeting_insights, humantic_user_profile_apis,
     humantic_internal — scattered throughout)
    CloudWatch monitoring + hardcoded-IP removal → Outlook calendar pagination →
    company-domain mismatch fixes → Sprinto-Slscan compliance-scan auth fix →
    internal tooling mirrors of subsID/account-creation work
    └─ kept the supporting services (compliance scanning, calendar sync,
       internal tooling) healthy alongside the main feature work
         │
         ▼
[12] AGENT-SDK ARCHITECTURE EXPLORATION (miia-agent-sdk-poc) — original systems design
    Built a from-scratch POC reproducing the full production MIIA report pipeline
    (scope → research → compression → extraction → report) on the OpenAI Agents SDK
    instead of production's SQS + custom harness, with vendored production prompts
    for fidelity, and multi-provider LLM routing (OpenAI/DeepSeek/Kimi/Qwen) so the
    same pipeline could be A/B'd across providers without touching production infra
    └─ the one piece of work that isn't a bugfix or incremental feature — original
       exploration of whether a production AI pipeline could be rebuilt on a
       different orchestration primitive
```

**One-line version for a portfolio bullet:**
"Owned backend-to-frontend feature delivery across 12+ repositories at Humantic AI — from onboarding/signup infrastructure and Salesforce/OAuth auth integrations, to a full MCP tool surface (PDF generation, async polling, custom tools) and the Grafana/Loki observability stack behind it, to a DB-backed email fraud-prevention layer shipped live into signup, to an original OpenAI Agents SDK proof-of-concept rearchitecting the production report-generation pipeline with multi-provider LLM support."

---

## 1. mcp (Humantic AI MCP server)

| Date | Task | Problem Statement |
|---|---|---|
| 2026-07-23 → 08-04 | OAuth connectivity | MCP had no proper OAuth-based auth flow for client connections (e.g. ChatGPT/Copilot connecting to Humantic MCP). Built the OAuth connectivity layer so external MCP clients can authenticate against Humantic accounts instead of relying on raw API keys only. |
| 2026-08-07 → 08-10 | Error handling for Bitbucket 444 | `throwIfBodyError` function didn't recognize Bitbucket's HTTP 444 ("no response") error code, so failures from that upstream were falling through as unhandled exceptions instead of clean error responses to the MCP client. Added explicit handling for 444. |
| 2026-08-18 → 08-25 | PDF download for PI/Miia profiles & reports | MCP users had no way to download a PI profile or Miia report as a PDF directly — they could only read the text/markdown tool output. Built: `downloadToken.ts` to mint/verify opaque, short-lived download tokens (so PDF links can't be forged or reused indefinitely); `pdf.ts` to call into `humantic_apis` for actual PDF generation; `handlers.ts` additions to generate the profile PDF download URL; `check-pdf-links.ts` as an assert-based self-check that the PDF link flow doesn't silently break; later extended to support Markdown-format downloads too, on top of PDF. |
| 2026-08-24 | Miia report rendering UI parity | The MCP-rendered Miia report page looked different from the app-dashboard version of the same report, confusing users who saw both. Rebuilt the MCP UI to match app-dashboard styling and merged the previously separate "Executive Summary" and "Full Report" views into one combined view. |
| 2026-08-24 | "Humantic MCP" → "Humantic AI MCP" rebrand | Product naming was inconsistent — docs, tool descriptions, titles, and FAQs referred to "Humantic MCP" while the product name had changed to "Humantic AI MCP". Did a sweep across documentation/templates/tool metadata to fix naming and clarify what each tool does. |
| 2026-08-19 → 08-25 | Simplify `content_personalize` tool | The `humantic_pi_content_personalize_v1` tool exposed separate `painpoint`/`valueprop` fields for "firstpitch" mode plus a now-unused `connreq`/`personalizedconnreq` response type — extra surface area that confused MCP callers and didn't match the public docs site. Collapsed the two fields into one (translator still fans it out unchanged to the backend), removed the dead `connreq` response type (content type is now always email), renamed the tool to `humantic_content_personalize_v1` to match public naming, and updated the marketing/docs site (landing tile, tool reference, examples) accordingly. This was a **breaking change** for existing callers using the old tool name or the removed response types. |
| 2026-09-01 | Expand MCP tool schemas (signals, refresh) | Signals tools (`SignalsListInput`/`SignalsAllInput`) lacked date-filter parameters, and there was no way for an MCP caller to trigger a PI profile refresh or a Miia report regeneration. Added `PiRefreshInputSchema` / `MiiaRefreshInputSchema`, added date filters to the signals schemas with validation, added Slack-based alerting middleware for tool failures, and updated docs to reflect the MCP now exposing 15 tools. (The alerting middleware was later removed/refactored out once Grafana alerting replaced it — see below.) |
| 2026-09-01 → 09-07 | PDF download page revamp | The PDF download landing page had inconsistent titles/loading messages across report types, and no proper loading/error shell while the PDF was being generated server-side. Standardized PDF report titles and loading text, and added a loading shell + error-handling scripts so users see a clean "generating your PDF" state instead of a blank page or raw error. |
| 2026-09-04 | Remove dead alerting code | Earlier Slack-based tool-failure alerting (added with the schema expansion above) became redundant once centralized Grafana/Loki alerting was planned; removed the now-unused alerting functionality and related code to avoid two parallel alerting paths. |
| 2026-09-07 | PiSearch tool | There was no MCP tool to search for a PI profile directly (callers had to already know the exact identifier). Added a `PiSearch` tool plus the request handling to look up profiles by search criteria. |
| 2026-09-09 | Async web insights polling | Profile fetch/create calls were blocking synchronously while waiting for "web insights" enrichment to finish, which could take a while and tied up the request. Converted this to an async polling pattern (`waitForWebInsights`) so the MCP server polls for completion instead of blocking, and removed a now-unused manual `sleep` helper, simplifying the polling parameters. |
| 2026-09-09 | Grafana Alloy → Loki logging/alerting | MCP had no centralized logging or alerting — failures and request patterns were invisible outside of local container logs. Built a full observability stack: `config.alloy` to tail the `humantic_mcp` container logs and ship them to Grafana Cloud Loki; a Grafana dashboard (`humantic-mcp.json`) to visualize logs; a local `docker-compose.yml` stack (Grafana + Loki + Alloy) for dev testing; provisioned Grafana alert rules and Loki datasource config; documented logs/alerts/test cases; updated the logger to emit structured JSON (for clean Loki ingestion) and added alert-throttling so repeated failures don't spam the alert channel. |
| 2026-09-14 | PDF download loading shell + error scripts | Follow-on to the PDF download page work — the shell still needed better handling of long-running PDF generation and edge-case errors. Enhanced the loading shell and added dedicated error scripts. |
| 2026-09-14 | `decideMiiaDomains` fix | Domain-resolution logic for Miia reports was incorrectly trying to force-resolve a domain on a side (buyer/seller) where resolution genuinely wasn't possible, instead of leaving it unverified and proceeding — causing wrong or failed domain decisions. Fixed the function to leave unresolvable sides unverified, and updated the related tests. |
| 2026-09-15 | Web-insights polling rate-limit exemption | MCP's own internal "web insights" re-poll requests (part of the async polling above) were being counted against the user-facing API rate limit, risking users getting rate-limited by the system's own background polling. Added a distinct `sourcePoint` for these re-poll requests so they could be exempted from rate limiting; a follow-up change to that `sourcePoint` broke the exemption, so it was reverted the same day to restore it. |
| 2026-09-23 | Revert citation-compaction (Copilot compatibility) | A function (`compactMarkdownCitations`) meant to shorten/compact markdown citation text ended up breaking how Microsoft Copilot renders citation links in its UI. Reverted the function to restore Copilot citation compatibility, even though it meant giving up the compaction improvement. |

---

## 2. humantic_apis (core backend APIs)

| Date | Task | Problem Statement |
|---|---|---|
| 2026-01-22 | GDPR email threshold increase | The outbound email-sending threshold (used to stay within GDPR-safe sending limits) was capped too low; raised it (roughly 1000 → 2000 range) per PR #797 so legitimate sending volume wasn't throttled. |
| 2026-01-23 → 01-29 | Auto-fetch subscription ID | Looking up an org's subscription required manually passing a `subsID`; if an org had none, the flow failed without a clear reason. Automated the subsID fetch so it's resolved server-side, and added a proper error message for the case where an org genuinely has no subscription ID. |
| 2026-02-22 → 03-24 | PRD onboarding backend | A new onboarding flow (defined by a product PRD) needed backend routes to support it — this was a multi-week build merged incrementally against `master`. After merge, a bug surfaced where PI/Miia report counts were wrong during onboarding; root-caused and fixed as a fast-follow. |
| 2026-03-05 / 03-06 | iCloud domain block | Users were signing up with disposable-feeling iCloud addresses to abuse free-tier usage/limits; blocked iCloud email domains at the signup/validation layer. |
| 2026-03-19 → 03-26 | Custom report save bug | Saving a "custom" (user-configured) report was failing or silently overwriting previous data in some cases. Fixed the save logic and added report-status storage so save state is tracked properly. |
| 2026-03-25 → 04-06 | Prospect activity Slack channel | Sales/success teams had no visibility into prospect activity (e.g. someone viewing a shared report) — it wasn't surfaced anywhere. Added a dedicated Slack notification channel for prospect activity, then extended it to also cover activity sourced from the public website (not just the dashboard). |
| 2026-04-08 → 04-09 | Multi-instance notification dedup | Because the service runs multiple instances, the same notification (e.g. Slack alert) could fire more than once for a single event. Added handling so notifications are deduped across instances. |
| 2026-04-13 | Notification format fix | Slack notification message formatting was inconsistent (spacing/structure), and there was a redundant conditional in the formatting logic. Fixed the format and removed the unnecessary condition. |
| 2026-04-15 → 04-17 | External signal error Slack alerts | When creating an "external signal" failed, there was no alerting — failures went unnoticed. Added a Slack alert specifically for external-signal creation errors, plus handling for Buying Committee Map (BCM) creation tied to that flow, and a domain-based condition to scope when the alert fires. |
| 2026-04-20 → 04-28 | More activity types + customer success channel | Only a handful of activity types were tracked for notification purposes, and there was no Slack channel dedicated to Customer Success. Added 4 new activity types, created a Customer Success-specific Slack channel, and added HubSpot-sourced message support so CS could see HubSpot activity alongside product activity. |
| 2026-04-24 → 04-28 | Miia Slack notifier | There was no notification when a Miia report finished generating (or failed) — users/internal teams had to manually check. Built a Slack notifier for Miia report completion/failure events. |
| 2026-04-29 | Proxy table routes | A "proxy" data table needed new DB-backed API routes that didn't exist yet; added them. |
| 2026-05-09 → 05-27 | Research depth metadata | Reports didn't expose how deep/thorough the research behind them was ("research depth"), which users wanted visibility into. Added a research-depth field to the API response header and to report emails; later renamed the field for clarity after feedback. |
| 2026-05-19 → 05-28 | LinkedIn enrichment + Sales Nav/lead-inbox block | LinkedIn Sales Navigator and lead-inbox search URL variants weren't being deduplicated correctly against regular profile URLs, causing duplicate profile entries; also added LI profile enrichment. Added enrichment, blocked the unsupported LI search URL variants from being treated as valid profile URLs, and fixed a related dedup bug. |
| 2026-06-04 → 06-08 | Domain-save routes + mismatch fix | Saving a resolved company domain had gaps in routing, and in some cases the domain recorded didn't match the company it was meant to represent (a mismatch bug). Added the missing domain-save routes and fixed the mismatch. |
| 2026-07-02 → 07-14 | OTP verification + destroy flow | Signup/password-reset needed a proper OTP (one-time-password) verification route, including correctly expiring/destroying OTPs after use so they can't be replayed. Built the route and destroy logic; also cleaned up leftover DB migration code no longer needed. |
| 2026-07-15 | Exceed-quota email | Users exceeding their usage quota had no email notification telling them so; added an "exceeded quota" email, and separately removed a now-redundant Slack alert for orgs with no subscription (superseded by better handling). |
| 2026-07-16 → 07-22 | Internal account creation + reset password | The internal team had no dedicated way to create accounts for internal use, and the password-reset flow had a form bug. Built an internal-account-creation path and a reset-password flow, fixing the form issue found during testing. |
| 2026-07-30 | Onboarding call failure fix | A specific onboarding call flow was failing under certain conditions; root-caused and fixed. |
| 2026-07-30 → 08-07 | Salesforce auth/token handling fixes | The Salesforce integration had two problems: the `access_token` DB column was the wrong type, and the token-expiry check mishandled date comparisons, causing "invalid date" errors instead of a clean re-auth/refresh. Migrated the column to `TEXT`, fixed the expiry-check logic, and added a missing `loginUrl` parameter needed by `addToSalesforceAuthDB` (later removed again once it turned out to be unused — refactor cleanup). |
| 2026-08-13 | Blocked domains (early pass) | Added initial domain-blocking capability (precursor to the later DB-backed blocking system, see ffraud below). |
| 2026-08-18 → 08-25 | Combined report + infographic email | Users were getting two separate emails — one for the report, one for the infographic — which felt redundant and cluttered their inbox. Combined both into a single email, added a "we saved you time" message to communicate the value of the combination, and removed now-dead code for the old pending-email/combine-window logic that the two-email flow used to need. Also added tests for PDF styling (`getAccountPDFStyles`) as part of the same PDF/email work. |
| 2026-08-20 | PDF generation directly from HTML | There was no route to turn an arbitrary HTML page into a profile PDF (PDFs were generated from structured data only). Added `generateProfilePDFFromHTML` plus a route exposing it. |
| 2026-09-09 | MCP web-insights rate-limit exemption (apis side) | Counterpart to the MCP-repo fix — the backend also needed to recognize MCP's internal polling requests as exempt from user-facing rate limits. Added the exempt source point on the API side. |
| 2026-09-15 → 09-18 | Salesforce query/filter fixes | The Salesforce prospect query didn't correctly handle boolean filter fields (returning wrong/no results for true/false filters), and it was missing an enrichment-status field plus had weak retry logic on failure. Fixed the boolean-filter handling, added the enrichment-status field, and improved retry behavior. |
| 2026-09-18 | Email fraud check (ffraud) — first pass | Signup had no fraud or disposable-domain validation at all, meaning bad actors could sign up freely with throwaway or known-bad email domains. Added an email-validation + fraud-check function with tests, laying groundwork that was later extended into full DB-backed domain blocking. |
| 2026-09-23 → 10-07 | DB-backed domain blocking (ffraud, extended) | The earlier fraud check was logic-only (not backed by a maintainable block-list); extended it to be DB-backed so blocked domains can be managed/updated without a code deploy, and refactored the email-validation logic around it. This work was still in progress/being merged as of Oct 7 (`kush/domain-block-via-db`). |
| 2026-09-11 | Stale meeting attendees cleanup | Outlook/Google meeting-insight handlers kept attendees in the participant list even after they'd left/been removed from the actual meeting, leading to stale data. Added logic to detect and remove stale participants from the attendee list. |
| 2026-08-17 | `dashboardConsumed` usage clarification | The usage-info calculation involving `dashboardConsumed` was hard to follow and had unclear edge-case behavior, risking incorrect usage numbers shown to customers. Refactored the calculation for clarity without changing intended behavior. |
| 2026-10-05 → 10-06 | Sell/upsell opportunity Slack channel | Sales had no dedicated channel for sell/upsell-opportunity signals detected in reports; added `sendToSellUpsellOppsChannel` and wired it into report notification logic. |
| 2026-10-07 | Email validation + fraud check in signup (final integration) | Tied together the fraud-check/domain-block work above directly into the live signup process, so new signups are validated against it in real time rather than as a separate/manual check. |

---

## 3. humantic-dashboard (new signup/onboarding frontend repo)

| Date | Task | Problem Statement |
|---|---|---|
| 2026-10-07 | Pre-login signup with OTP verification | This new dashboard had no signup flow at all before login existed — users had no self-serve way to create an account without going through the old app. Built the full pre-login signup flow with OTP (one-time password) verification end-to-end as the first feature in this repo. |

**Known gap (not yet fixed, tracked separately):** this OTP signup flow currently has **no fraud/domain block** wired in (unlike the `humantic_apis` ffraud work) — a fix was written and then reverted; root cause of the revert is still open. See `[[project_signup_otp_missing_fraud_check]]` memory.

---

## 4. app-dashboard (main customer-facing dashboard)

| Date | Task | Problem Statement |
|---|---|---|
| 2026-01-30 → 02-20 | Share link + compatibility section fixes | The "copy share link" button and a "compatibility" info section both had bugs (copy not working correctly, compatibility display issues), and the share flow lacked an API-key parameter needed for shared viewers to actually load the report. Fixed both bugs and added the API-key param to the share flow, plus added a share icon and fixed a missing tooltip on it. |
| 2026-02-04 → 03-23 | Onboarding flow redesign (flows 3, 4, 5) | The onboarding experience needed a multi-step redesign per product spec — this was a large incremental build across several "flows" (3 through 5), not a single task. Built flow 3 (with mobile view, skip-flow correction, and fallback-for-skip handling), then flow 4, then flow 5, iterating based on review feedback and bug reports (designation bugs, re-engagement issue, iCloud block mirrored from backend, sample-report mapping, session issue) along the way. |
| 2026-02-16 → 02-24 | Designation tooltip/UI fix | The job-designation tooltip was missing or visually mismatched compared to how the browser extension displayed the same info, confusing users who used both. Fixed and restyled the tooltip to match, with a follow-up bug fix after initial release. |
| 2026-03-04 | PI/Miia report count issue (onboarding) | During onboarding, the displayed count of PI/Miia reports was wrong (same underlying bug class as the backend fix), confusing new users about their usage. Fixed on the frontend side. |
| 2026-04-07 → 04-16 | Extension install detection fix | The dashboard's logic to detect whether the user had the Humantic browser extension installed failed for some browsers, so users were shown the wrong install prompt. Fixed detection, added Safari-specific detection, and enabled the check to work across multiple browsers (not just Chrome); also removed an unnecessary API call that was being made as part of the old detection flow. |
| 2026-04-14 → 04-17 | Icon overlap fix | UI icons were visually overlapping at certain screen widths/breakpoints, making the UI look broken. Fixed the overlap across affected breakpoints. |
| 2026-04-23 → 04-28 | Shareable link + viewer API key | External viewers (people without a Humantic account) who received a shared report link couldn't properly access the report content. Added a viewer-scoped API key so shared links work for people outside the org. |
| 2026-05-05 → 05-11 | Research depth on report header/PDF | Mirrors the backend research-depth feature — the frontend needed to actually display it. Surfaced the research-depth value in the report header UI and in the exported PDF. |
| 2026-05-08 → 05-11 | Search error messages + retry | Search failures in the dashboard showed generic or no error messages, leaving users confused about what went wrong or what to do next. Added specific, actionable error messages and retry logic for failed searches. |
| 2026-05-19 → 05-25 | Mobile view icon overlap | A separate, mobile-specific icon-overlap issue (distinct from the earlier general icon-overlap fix) was found on small screens; fixed. |
| 2026-06-17 → 06-24 | Search retry logic + new dashboard UI | Search reliability needed improving (retry logic for transient failures), and alongside this a broader visual refresh was rolled out: new dashboard UI, logo change, and a domain-confirmation step added to the signal modal (to catch cases where the resolved company domain might be wrong) plus general modal UI polish. |
| 2026-06-25 → 07-14 | Infographics UI + new PI dashboard | Report infographics had no dedicated UI in the dashboard; added one. Also did a larger redesign of the PI (Personality Insights) dashboard — new PI UI, mobile view for the Buying Committee Map (previously unusable on mobile), and iterative UI fixes based on review across several follow-up PRs. |
| 2026-07-23 → 08-18 | Intent signal integration | The dashboard showed signals but had no way to represent "intent" data (a new signal category) distinctly — intent subtype labels, icons, and category mapping didn't exist. Integrated intent-data into the signals UI: added subtype labels and category mapping, then iterated (removed intent subtype icons again after feedback, refined signal-category labels) across several rounds based on review. |
| 2026-08-05 → 08-18 | Apollo/Bombora logo + fallback fixes | Logos for signals sourced from Apollo and Bombora (two data providers) were broken or missing a fallback when the logo failed to load. Fixed the Apollo logo URL, then separately removed the broken Bombora logo URL + its error-handling path in favor of simpler, more reliable fallback styling. |
| 2026-08-10 → 08-18 | Public profile view refactor (PDF + share) | The public-facing profile view page (used for shared/public reports) needed PDF download and sharing capability, but its component structure wasn't set up to support that cleanly. Refactored the component's HTML structure and styling and implemented PDF download + sharing functionality on top of the new structure. |

---

## 5. humantic_backend_api_v2 (report generation / data backend)

| Date | Task | Problem Statement |
|---|---|---|
| 2026-02-06 → 02-11 | KPI/Miia metrics + job-posting cache automation | KPI metrics tied to Miia report generation were being tracked manually, which was error-prone and slow; also job-posting data had no caching, so repeated lookups were wasteful. Automated the KPI metrics file-upload process and added job-posting-service caching with its own cache metrics. |
| 2026-02-18 → 03-20 | Weekly KPI report doc publishing + demo report fixes | There was no automated way to publish a weekly KPI report document — it was manual. Built an automated weekly KPI doc-publishing pipeline, and in parallel updated/fixed the demo report (content was stale, and the underlying generation logic had a bug that was corrected after code review feedback). |
| 2026-03-13 | Slack webhook env migration + config fixes | The Slack webhook URL used for notifications was hardcoded directly in source, a security/maintainability risk (can't rotate without a deploy). Moved it to environment configuration, fixing a couple of small mistakes along the way during review. |
| 2026-04-16 → 04-17 | Deployment script + environment auto-detection | Deploying to different environments (dev/staging/prod) required manual steps and there was no automatic environment detection. Added `prod_deployment.sh` and logic to automatically detect which environment the service is running in. |
| 2026-04-29 → 06-08 | Domain-save routes + map-saving correction + mismatch fix | Saving a resolved company domain via this backend had route gaps (mirroring the `humantic_apis` work, but this is the v2 backend's own copy of the flow) and a bug where the wrong domain got persisted in a "map saving" scenario, requiring three successive correction passes. Added the missing route and iteratively fixed the mismatch until it was correct. |
| 2026-05-05 → 05-18 | Recent news link | Reports had no link surfacing recent news about the company being researched, something users wanted for context. Added a "recent news" link, with cleanup of unnecessary whitespace/mapping changes along the way. |
| 2026-05-06 → 08-28 | Vertex AI redirect URL handling | URLs sourced via Vertex AI (Google's AI platform, used for some research) needed proper redirect resolution (many URLs from search results are redirect/tracking links, not the final article). Added strict-mode redirect handling; a later regression in the domain-resolution logic broke this and was fixed in a follow-up (Aug 28). |
| 2026-06-16 | Cold email script fix | A script used to generate cold outreach emails had a bug producing incorrect output; fixed. |
| 2026-06-24 → 06-30 | Logs cleanup + shared log utils | Logging across backend_v2 had become noisy and inconsistent, making debugging harder than it should be. Did a cleanup pass, restored a logging file that had been accidentally removed, and added shared log utilities so logging is consistent across the codebase. |
| 2026-08-21 | Single-email + infographic request_id tracking | Mirrors the `humantic_apis` combined-email work, but on the v2 backend side — needed a `request_id` passed through to infographic email notifications specifically so demo/trial activity could be tracked back to the originating request. Added the parameter and wired it through. |
| 2026-08-26 → 09-01 | Signals disappearing on report regeneration | When a Miia report was regenerated (e.g. refreshed with new data), previously-found signals were being lost/overwritten instead of retained, meaning users lost visibility into earlier signals. Fixed the regeneration logic to retain prior signals across regeneration. |
| 2026-09-17 → 09-19 | Arista tech-stack categorization (seller override) | Arista (a specific seller/customer) needed its own hardware & networking tech-stack category definitions and limits that the generic categorization logic didn't support, because their product catalog doesn't fit the default category buckets well. Added new hardware/networking category entries and per-category limits, added an async call to GPT-5.6-Luna for JSON-structured categorization output, and updated the general categorization rules to accommodate Arista specifically without breaking other sellers. |
| 2026-09-17 | Education-level handling + tooltip sanitization | Education-level data had unhandled edge cases (producing odd/incorrect display values), and tooltip content wasn't being sanitized, risking broken rendering or minor injection issues if tooltip text contained special characters. Refactored education-level handling to cover edge cases and added sanitization to tooltip content. |

---

## 6. agents (signal/report agent pipeline)

| Date | Task | Problem Statement |
|---|---|---|
| 2026-04-15 → 04-17 | Separate debug/error Slack channels | Debug-level and error-level alerts were both going into a single Slack channel, making it hard to tell at a glance what was a real problem versus routine debug noise, and the webhook URL used was hardcoded in source. Split debug and error alerts into separate channels, removed the hardcoded Slack webhook URL (moved to config), and added a developer-monitoring URL directly in error messages so whoever sees the alert can jump straight to the relevant monitoring dashboard. |
| 2026-04-20 | Level-based error alerting | Errors had no severity levels, so every error looked equally urgent regardless of actual impact. Added level-based error handling so alerts can be triaged by severity. |
| 2026-09-17 → 09-19 | Arista seller-specific tech stack (agents side) | Counterpart to the backend_v2 Arista work — the agent pipeline that generates the tech-stack section of the report also needed Arista-specific hardware category overrides, and had a bug where hardware/networking categories weren't consistently placed above the generic "Other" bucket, making the section look disorganized. Added the Arista-specific hardware overrides and rendering, fixed the category placement (hardware/networking always shown above "Other"), and added seller-specific placement rules generally (not just for Arista) plus bumped the model version used for this categorization step. |

---

## 7. payment_website

| Date | Task | Problem Statement |
|---|---|---|
| 2026-04-15 | iCloud domain block | Same recurring abuse pattern as other repos — iCloud addresses being used to bypass payment/signup limits. Blocked iCloud domain here too. |
| 2026-06-11 → 06-22 | Calendar access modal + revocation | Users connecting Google/Outlook calendar had no clear consent modal, and there was no way to revoke calendar access once granted. Added a calendar-access consent modal and a revocation flow. |
| 2026-07-02 → 07-14 | OTP signup form | Signup on payment website had no OTP verification step, same gap as other signup surfaces. Built an OTP form for email verification during signup. |
| 2026-07-08 → 07-14 | OAuth 2.1 update | OAuth implementation was on an older spec version, causing compatibility issues with newer MCP/connector clients expecting OAuth 2.1 semantics. Updated the flow to OAuth 2.1. |
| 2026-07-23 → 07-24 | OAuth connectivity, org API key, OTP skip | Needed org-level API key exposure post-auth and a way to skip OTP in specific flows (e.g. already-verified orgs) to avoid redundant verification friction. Added OAuth connectivity, org API key surfacing, and OTP-skip logic. |
| 2026-07-30 → 08-19 | Salesforce integration hardening | Salesforce auth was failing silently in places — errors weren't logged clearly, focus handling broke when the auth popup opened in a new window, and there was no Sandbox (test) option for orgs that needed it. Added error handling + logging for Salesforce auth, fixed focus handling for the new auth window, enhanced integration error handling/logging further, and added a Salesforce Sandbox option alongside the production auth flow. |
| 2026-08-13 | Email personalizer UI polish | Font style/color in the email personalizer tool was inconsistent, and the user-context editor lost focus unexpectedly. Fixed styling and added proper focus handling. |
| 2026-08-27 | Competitor tags read-only mode | Non-admin users could edit competitor tags they shouldn't be able to change, and the UI for them wasn't adapted for restricted access. Added read-only support for competitor tags and improved the UI for non-admin users. |
| 2026-09-07 → 09-11 | MCP OAuth consent screen fixes | The MCP OAuth consent flow was written in a way that was hard to follow (callback-style) and had two real bugs: a login-redirect race where the session wasn't persisted before the response was sent (causing redirect failures), and the consent/approval screen being shown again even for users who had already granted access and not revoked it. Refactored the consent flow to async/await for readability, fixed the session-persistence-before-redirect bug, and fixed `hasPriorGrant` so previously-granted (non-revoked) access skips the approval screen on reconnect instead of re-prompting. |
| 2026-09-18 | Personality message generation refactor | Fallback logic for generating a "personality message" was overly complex and didn't account for word count, risking overly long or short output. Simplified fallback logic and added word-count awareness. |
| 2026-09-29 → 10-05 | Loading state + competitor comparison UI | A page lacked a loading state while data was fetching (showing blank/broken UI instead), and competitor-comparison UI needed changes. Added the loading state and made the UI updates. |

---

## 8. humantic-website (public marketing/product site)

| Date | Task | Problem Statement |
|---|---|---|
| 2026-01-30 → 02-27 | Compatibility section | The public site had no section showing tool/platform compatibility info; added it, then fixed bugs/conflicts found after merge (including a designation display bug and a PDF-download UI issue found along the way). |
| 2026-02-02 | API key query param | Needed to support passing an API key via query parameter on certain public pages; added support and cleaned up leftover debug console logs. |
| 2026-02-16 → 02-24 | Designation section | Public profile pages didn't show the person's job designation; added a designation section, then fixed a bug in it. |
| 2026-03-05 → 05-01 | iCloud domain block | Same recurring fix as other repos — blocked iCloud domains here too, iterated after merge conflicts. |
| 2026-04-01 → 04-06 | "Added origin website" tracking | There was no way to tell which originating website/source a visitor or lead came from; added origin-website tracking. |
| 2026-04-14 → 04-17 | Icon overlap fix | Same recurring UI bug as app-dashboard — icons overlapping at certain breakpoints; fixed. |
| 2026-05-19 → 05-25 | Remove yellow share icon on mobile | A yellow share icon was showing on the mobile view where it wasn't meant to (likely a responsive-CSS leak); removed it specifically from mobile view. |
| 2026-07-03 → 07-14 | PI/app-dashboard connect + pipeline fix | The public profile page needed a way to connect through to the main app-dashboard (e.g. "view full profile" linking into the app), and the Bitbucket CI pipeline had a config issue breaking builds. Added the PI-to-app-dashboard connect flow and fixed the pipeline config. |
| 2026-07-22 | DISC profile fix | The DISC personality-type display had a bug — removed a stray default "D" value that was showing incorrectly when no real DISC type was available. |
| 2026-08-10 | Embedded-mode / dashboard-redirect handling | When the public profile is viewed embedded inside the app-dashboard (vs standalone), it shouldn't show its own PDF-download button/footer (dashboard has its own), and login should redirect straight to the dashboard profile for non-embedded visits. Added mode detection to hide the duplicate PDF/footer UI in embedded mode and trigger PDF download appropriately, and fixed the login redirect for standalone mode. |
| 2026-09-08 → 09-25 | DISC display + profile UI polish | DISC type display had inconsistent casing (not properly capitalized), there was no confidence indicator for how reliable the DISC assessment was, and the user-profile display lacked initials-based avatars for users without a photo. Fixed casing, added a confidence label to DISC results, added initials-based avatar display, and did a broader code-structure refactor for readability/maintainability alongside general functionality/performance improvements. |

---

## 9. chrome_extension (browser extension — LinkedIn/Salesforce/HubSpot/Outlook integration)

| Date | Task | Problem Statement |
|---|---|---|
| 2026-04-07 → 04-13 | Fixed image URL | A profile image wasn't loading correctly inside the extension due to a broken image URL; fixed. |
| 2026-04-21 → 05-01 | Meeting-insight quick fixes + low-confidence handling | Meeting-insight features had several small but user-visible bugs: text/function mismatches, behavior for existing users not handled correctly, low-confidence personality results not flagged, and a dev-iframe URL that needed updating. Fixed all of these as a cluster of quick fixes. |
| 2026-05-18 → 05-29 | LLM fail-case handling + content-personalization sourcePoint cleanup | When the underlying LLM call failed, there was no defined fallback behavior; added handling for the fail case. Also added (then partly reverted) a `sourcePoint` parameter on content-personalization/prefetch calls after finding it introduced redundant tracking — cleaned up to remove the redundant parameter. |
| 2026-05-27 → 05-28 | Remove LinkedIn Sales/Lead links from extension UI | Sales Navigator / Lead inbox links were being shown in the extension where they weren't actionable or supported, confusing users; removed them from the UI (companion to the backend LI Sales Nav block in `humantic_apis`). |
| 2026-06-09 | Block duplicate-email CRM check | When a CRM contact's email already existed, the extension would still attempt to re-process it; added a block (`DmEx`) to skip when the CRM email already exists. |
| 2026-06-15 → 06-19 | UI fixes | General UI fixes/polish batch, merged alongside a teammate's "Add Meeting Insight Button" branch. |
| 2026-06-24 | Bitbucket pipeline info update | CI pipeline metadata needed updating; fixed. |
| 2026-06-30 | Own-profile fix | The extension mishandled the case where a user viewed their own LinkedIn profile (treating it like any other prospect); fixed, with console-log cleanup. |
| 2026-07-14 → 08-09 | LinkedIn URL fix (custom field support) | Some LinkedIn URL formats (custom/vanity URLs) weren't parsed correctly, causing wrong-profile data to be fetched; added support for custom LinkedIn URL fields and fixed a case where the wrong profile was fetched due to URL mis-parsing. Also added a storage-change listener so the extension reacts live when the user's own LinkedIn username changes, and a check to detect/update when the user is viewing their own profile. |
| 2026-08-13 → 08-17 | Salesforce email personalization | The extension had no way to personalize/generate an email directly from within Salesforce (users had to switch tools). Built this: dynamic recipient handling in the email composer, a hover-styled dropdown for triggering email generation, functions to fetch the Salesforce account ID and company page info, and tooltip + window-sizing fixes for the composer. |
| 2026-08-24 | Company domain retrieval (Zoho + Salesforce fallback) | Company domain lookup failed for some Zoho CRM accounts due to invalid company-page validation, and Salesforce accounts without a `Website` field had no fallback. Fixed Zoho domain-retrieval/validation logic and added a fallback to the Salesforce `Account Site` field when `Website` is empty. Also shipped "quick account insights" as a new feature and bumped the extension manifest version twice (4.0.0.101 → 4.0.1.0) to release these. |
| 2026-09-07 | Quick account insights loading/error handling | The new quick-account-insights feature (shipped Aug 24) had rough loading-state and error-handling behavior; enhanced both. |
| 2026-09-18 | HubSpot draft-editor selection scope fix | A rich-text draft-editor selection meant only for the email panel was leaking scope and affecting other parts of the HubSpot page; scoped the selection fix to just the email panel. |
| 2026-09-28 | Meeting deduplication logic | Calendar sync was creating duplicate meeting entries for the same event (e.g. synced from multiple sources); added dedup logic that retains the version of the event with the most participants (the most complete one). |
| 2026-10-09 | Structural updates/optimizations across modules | A broader internal refactor across multiple extension modules for structure and performance, most recent work in this repo. |

---

## 10. humantic_meeting_insights (meeting/calendar insight service)

| Date | Task | Problem Statement |
|---|---|---|
| 2026-02-05 → 03-11 | Google Calendar CloudWatch monitoring + hardcoded-IP cleanup | There was no CloudWatch visibility into Google Calendar event processing, and hardcoded password/IP values were committed in multiple places — a security/maintainability risk. Added CloudWatch monitoring for calendar events, and removed the hardcoded IPs from two separate locations in the codebase. |
| 2026-08-20 | Revoke-email handling | Picked up a teammate's fix for sending revoke emails correctly (merged into this branch's history). |
| 2026-08-31 → 09-11 | Extend participant-processing window + Outlook pagination | Participant processing only looked a short window ahead, missing meetings further out, and Outlook calendar event fetching had no pagination (so it silently missed events beyond the first page). Extended the participant-processing interval to 7 days ahead, and added proper pagination support to `getOutlookCalendarEventsFromApi`, refactoring the pagination logic to handle dynamic page fetching and improve overall event retrieval reliability. |

---

## 11. humantic_user_profile_apis (profile data backend)

| Date | Task | Problem Statement |
|---|---|---|
| 2026-06-04 → 06-24 | Company domain mismatch fix | Same recurring domain-mismatch bug class as other backends — the wrong company domain was being associated with a profile in some cases; fixed, and fixed a related issue in the example cold-email flow. |
| 2026-06-24 → 07-14 | Bitbucket pipeline update | CI pipeline configuration needed updating to keep builds passing; fixed. |
| 2026-07-14 → 08-28 | DB fixes + query fixes | Several database-query issues were affecting correctness of profile data lookups ("as said updated", "query-fixes"); fixed iteratively, including a related LinkedIn URL fix carried over from work in `chrome_extension`. |
| 2026-07-17 | Sprinto-Slscan upload auth fix | A scheduled compliance scan (Sprinto-Slscan, used for SOC2-type security scanning) was failing with 401 errors because this branch was still running the deprecated app-password upload method even though the fix had already landed on `master`. Upgraded to the newer pipe version (0.7.5) with API-token auth to stop the recurring scan failures. |

---

## 12. humantic_internal (internal tooling)

| Date | Task | Problem Statement |
|---|---|---|
| 2026-01-23 → 01-29 | Auto-fetch subscription ID (internal tooling side) | Mirrors the `humantic_apis` subsID work — internal tooling also needed the subscription ID auto-fetched rather than requiring manual entry, including correct handling of the empty-field and no-longer-fetching states, with an updated user-facing message. |
| 2026-07-16 → 07-20 | Internal account creation + reset password (internal tooling side) | Mirrors the `humantic_apis` internal-account-creation and password-reset work — built the corresponding internal-tooling UI/flow for creating accounts and resetting passwords, with a form-update fix after initial testing. |

---

## 13. gatekeeper (access-control service)

No commits authored by Kush Goel found in this repo's history — all history is attributed to another contributor (Ayush Kumar). No task entries here.

---

## 14. miia / deepsense-dashboard / vidar

No commits authored by Kush Goel found in these three repos' git history (`miia` history is from the original Humantic/Frrole team; `deepsense-dashboard` and `vidar` history is from other current teammates). No task entries here.

---

## 15. miia-agent-sdk-poc (Agent SDK proof-of-concept) — most important recent work

This repo has **no git commit history** (local-only POC, never pushed/committed — currently sitting as uncommitted changes on `master`), but it represents a distinct and substantial piece of work: a from-scratch proof-of-concept exploring agent-framework design for Humantic's core report-generation pipeline.

**What it is:** A standalone POC that re-implements the production MIIA (Market Intelligence/Insight Agent) report pipeline — the same one powering `agents/` and `miia/` in production — but built on the **OpenAI Agents SDK** instead of the production SQS + custom-harness architecture.

**Problem statement:** Production MIIA report generation (buyer/seller research → compression → pain-point/value-prop extraction → full report + executive summary) runs on a hand-built SQS queue + custom orchestration harness, using Exa/Gemini/Perplexity for search and FAISS for retrieval-augmented context. This is production-proven but heavyweight to prototype against — testing a new report-generation idea means working inside the full production infra. The POC asks: *could the same pipeline be expressed more simply on a standard agent-orchestration SDK, and made LLM-provider-agnostic?*

**What was built:**
- A FastAPI-based web app (`app/main.py`) exposing `POST /api/reports/trigger`, mirroring the production trigger API shape.
- A full MIIA-aligned pipeline (`app/agents/research_pipeline.py`) reproducing all 6 production stages (scope brief → buyer/seller research → compression → pain-point/value-prop extraction → full report → contextual insight brief) using OpenAI Agents SDK's `Runner.run` loops instead of SQS.
- A **vendored prompt layer** (`app/prompts/`) — the actual production prompts from `agents/prompts.py`, `agents/generate_report.py`, `agents/seller_context.py`, and `miia/miia/prompts/` copied in as-is, so the POC's output quality is directly comparable to production rather than using placeholder prompts.
- **Multi-provider LLM routing**: the app natively runs on OpenAI, but is wired to also run DeepSeek, Kimi (Moonshot), and Qwen (DashScope) via OpenAI-compatible APIs — selectable per-run from the UI or forced via `.env` (`LLM_PROVIDER=openai|deepseek|kimi|qwen|auto`), with `auto` mode routing by model ID. DeepSeek/Kimi/Qwen runs work **without an OpenAI key at all** (keyword-based retrieval instead of OpenAI embeddings), which was a deliberate design choice to let the POC double as a cheap way to A/B different LLM providers against the same prompts and pipeline.
- Web search abstraction (`app/agents/tools.py`) using only the hosted `WebSearchTool` (OpenAI/Qwen on the Responses API, Kimi via Moonshot's builtin `$web_search`) — intentionally simpler than production's Exa/Gemini/Perplexity fan-out, to isolate whether pipeline logic alone (without the heavier search stack) could produce comparable reports.
- RAG-style context formatting (`app/agents/context_format.py`) feeding research notes to report writers as context, as a lighter substitute for production's FAISS retrieval.
- Pluggable storage backend (file-based for local dev, MongoDB-ready for shared use) and a documented local run path (`docker-compose.yml`, `run.sh`, `.env.template`).

**Why it matters for a portfolio:** this is the one piece of work in the whole set that isn't a bugfix or an incremental feature — it's original systems-design exploration: taking a production multi-stage AI pipeline and asking what it would look like rebuilt on a different orchestration primitive (agent SDK vs. queue+harness) and made provider-agnostic, while keeping prompt fidelity to production so the comparison is meaningful.

---

## Inter-related Tasks (single feature/workflow split across repos, directly dependent)

These are not just "same pattern repeated" — one task's output is consumed by, or was built specifically to connect with, another task below.

1. **MCP PDF download → humantic_apis PDF generation**
   `mcp` (2026-08-18, "PDF download functionality") calls into `humantic_apis`'s `generateProfilePDFFromHTML` (2026-08-20) via its own `pdf.ts` interface. The MCP-side download token/handler is useless without the API-side PDF generation route existing first.

2. **MCP web-insights rate-limit exemption (two-sided fix)**
   `mcp` (2026-09-15, "add distinct source point for web insights re-poll") and `humantic_apis` (2026-09-09, "allow external signals for MCP requests" / rate-limit exempt source point) are the client and server halves of the same fix — MCP tags its internal polling requests, `humantic_apis` has to recognize that tag to actually exempt them.

3. **Single combined email: humantic_apis ↔ humantic_backend_api_v2**
   `humantic_apis` (2026-08-18 → 08-25, combined report+infographic email) and `humantic_backend_api_v2` (2026-08-21, request_id added to infographic notifications) are the same feature — v2 generates/triggers the infographic, `humantic_apis` is where the two emails actually got merged into one; the request_id was added specifically so the merged flow could still be traced back to one originating request.

4. **Research depth: humantic_apis (data) → app-dashboard (display)**
   `humantic_apis` (2026-05-09 → 05-27, research-depth field added to API header/email) is the data source; `app-dashboard` (2026-05-05 → 05-11, research depth shown on report header/PDF) is purely a consumer — the dashboard feature literally could not exist until the API field shipped.

5. **iCloud domain block: backend-first, frontend mirrors**
   `humantic_apis` (2026-03-05) blocked iCloud at the API/validation layer first; `app-dashboard` (same week), `humantic-website` (2026-03-05 → 05-01), and `payment_website` (2026-04-15) each added matching UI-side blocks/messaging so users get a clear reason at signup instead of a generic API rejection — all pointing at the same backend rule.

6. **Domain-save routes/mismatch: humantic_apis ↔ humantic_backend_api_v2**
   Both repos independently needed a "save resolved company domain" route and both hit the same mismatch bug class (wrong domain persisted) in the same window (2026-04-29 → 06-08) — same underlying domain-resolution service being called from two different backends, so the mismatch root cause and fix shape were shared even though the commits are separate.

7. **MCP OAuth → payment_website consent/connectivity**
   `mcp` (2026-07-23, "oauth-connectivty") established the MCP-side OAuth flow; `payment_website` (2026-07-23 → 09-11: oauth-connectivity, OAuth 2.1 update, consent-screen async refactor, `hasPriorGrant` fix) is where the user-facing consent/authorization screen and grant-persistence logic actually lives — the MCP flow redirects into this website's consent UI, so the Sept consent-screen bugfixes directly fixed what the July MCP OAuth work depends on.

8. **Email fraud/OTP: humantic_apis (backend) → humantic-dashboard + payment_website (frontend forms)**
   `humantic_apis` (2026-07-02 → 10-07, OTP route + ffraud/domain-block) is the backend verification logic; `payment_website`'s OTP form (2026-07-02 → 07-14) and `humantic-dashboard`'s pre-login OTP signup (2026-10-07) are front-end surfaces built against that same backend OTP flow. Note: `humantic-dashboard`'s surface still isn't wired to the fraud-check half of this backend work (open gap, see repo 3 above).

9. **Salesforce integration: humantic_apis (auth/token storage) ↔ payment_website (connect UI)**
   `humantic_apis` (2026-07-30 → 09-18: token type fix, expiry handling, query/filter fixes) stores and manages the Salesforce connection server-side; `payment_website` (2026-07-30 → 08-19: error handling, focus handling, Sandbox option) is the UI the user actually clicks through to create that connection — a bug in either half breaks the same end-to-end "connect Salesforce" flow.

10. **PI/Miia report count bug: fixed twice, same root cause, two layers**
    `humantic_apis` (2026-03-04, "pi-miia-report-count-issue-fix") fixed the backend count calculation; `app-dashboard` (2026-03-04, same day, "onboarding-flow-pi-miia-report-count-issue") fixed the onboarding UI's display of that same count — shipped together because the UI was reading a value the backend had just corrected.

---

## Cross-cutting themes (same underlying problem touched in 3+ repos)

- **Arista seller customization** — tech-stack/hardware categorization needed seller-specific overrides not supported by the generic logic: `humantic_backend_api_v2` + `agents`.
- **Combined report + infographic email** — eliminating the redundant two-email flow: `humantic_apis` + `humantic_backend_api_v2`.
- **Research depth metadata** — exposing how thorough a report's research was: `humantic_apis` + `app-dashboard`.
- **Signup fraud/domain blocking (iCloud + general)** — iCloud blocking repeated across `humantic_apis`, `app-dashboard`, `payment_website`, `humantic-website`; later evolved into DB-backed domain blocking + full fraud check in `humantic_apis`, with `humantic-dashboard`'s OTP signup still missing the fraud check (open gap).
- **MCP OAuth / connectivity** — OAuth flow built/hardened across `mcp` and `payment_website` (OAuth 2.1 update, consent-screen fixes, prior-grant handling).
- **MCP web-insights rate-limit exemption** — making MCP's own internal polling not count against user rate limits: `mcp` + `humantic_apis`.
- **Domain-save routes/mismatch fixes** — resolving and persisting the correct company domain: `humantic_apis` + `humantic_backend_api_v2`.
- **Icon overlap (responsive UI bug)** — same class of bug fixed independently in `app-dashboard` and `humantic-website`.
- **Salesforce integration** — auth/token handling in `humantic_apis`, connectivity + Sandbox option + error logging in `payment_website`.
