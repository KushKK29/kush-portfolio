// Case study content. Edit freely — the renderer only cares about the shapes,
// not the prose. Add a new case study by copying this file shape into a new
// file in this folder; it is picked up automatically.
export default {
  slug: "freshdesk-mcp",
  type: "project",
  order: 7,
  title: "Freshdesk MCP Connector",
  role: "Solo developer",
  timeframe: "2025",
  oneLiner:
    "An MCP server giving AI agents read access to Freshdesk tickets — with its own self-hosted OAuth 2.1 authorization server for multi-tenant use.",
  stack: ["Python", "MCP", "OAuth 2.1", "MongoDB", "Vercel"],
  sections: [
    {
      type: "problem",
      content:
        "Giving an AI agent (Claude, ChatGPT, Claude Code) access to Freshdesk support tickets means solving auth twice: a single operator just needs an API key in .env, but letting anyone connect their own Freshdesk account needs full OAuth — and Freshdesk itself has no OAuth app registration to lean on. The connector had to be its own authorization server, not just an API wrapper.",
    },
    {
      type: "architecture",
      content:
        "Two deployment modes share one connector. Single-tenant needs nothing beyond Python and an API key in .env — one operator, one Freshdesk account. Multi-tenant needs MongoDB and a public HTTPS endpoint, because the connector itself acts as a full OAuth 2.1 authorization server: it implements Dynamic Client Registration (RFC 7591) so any MCP client can self-register, mandatory PKCE (S256) for public clients like Claude or ChatGPT, and RFC 8414 discovery metadata so clients auto-find every endpoint without manual configuration.",
    },
    {
      type: "decisions",
      items: [
        {
          decision: "Built a self-hosted OAuth 2.1 authorization server instead of requiring a Freshdesk OAuth app",
          why: "Freshdesk doesn't offer OAuth app registration, so there was no platform primitive to build on. Making the connector its own authorization server — DCR, PKCE, discovery metadata — means any MCP client can connect without Freshdesk-side setup.",
        },
        {
          decision: "Made authorization codes single-use, claimed atomically in MongoDB",
          why: "A code that can be claimed twice is a replay vector. Atomic claiming closes the race condition between two concurrent redemption attempts instead of relying on a check-then-act pattern that can lose the race.",
        },
        {
          decision: "Stored only SHA-256 hashes of codes and tokens, never the raw values",
          why: "If the token store is ever read (a backup leak, a misconfigured access), hashed values can't be replayed directly — the same principle as never storing plaintext passwords, applied to OAuth artifacts.",
        },
        {
          decision: "Scoped the connector strictly read-only",
          why: "An AI agent with Freshdesk access should be able to see tickets, not mutate or delete them. No create/update/delete, no attachment downloads — the blast radius of a bad response is bounded by design, not by prompt instructions.",
        },
      ],
    },
    {
      type: "challenges",
      items: [
        {
          problem: "Freshdesk enforces rate limits, and a naive integration would just get throttled under load",
          fix: "Reads X-RateLimit-Remaining after every call and backs off before hitting the ceiling, rather than finding out via a failed request. On a 429, retries once honoring the Retry-After header instead of hammering the API.",
        },
        {
          problem: "Rotating refresh tokens needed to actually rotate, not just extend the same token indefinitely",
          fix: "Implemented rotating refresh tokens so each refresh issues a new token and invalidates the old one — a stolen refresh token has a limited window instead of being a permanent credential.",
        },
      ],
    },
    {
      type: "evidence",
      items: [
        { label: "Live connector", url: "https://fresh-desk-mcp.vercel.app" },
      ],
    },
    {
      type: "outcome",
      content:
        "A live MCP server at fresh-desk-mcp.vercel.app that needs no setup to try: add it as a custom connector in Claude.ai or ChatGPT's Connectors page, authorize with your own Freshdesk domain and API key, and ask it to list recent tickets — or add it via claude mcp add --transport http freshdesk https://fresh-desk-mcp.vercel.app in Claude Code. The OAuth 2.1 side — DCR, PKCE, atomic single-use codes, rotating refresh tokens, hashed storage — is the part that makes it usable by anyone, not just one operator with an API key.",
    },
  ],
};
