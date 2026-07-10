export default {
  slug: "geeksforgeeks",
  type: "experience",
  order: 3,
  title: "GeeksforGeeks — SDE Intern",
  role: "SDE Intern",
  timeframe: "Oct 2025 – Jan 2026",
  oneLiner:
    "A recruiter dashboard for 200+ active users and a full PHP → Next.js migration of the internal org dashboard.",
  stack: ["Next.js", "Redux", "SCSS", "Django", "PHP"],
  sections: [
    {
      type: "problem",
      content:
        "Two problems, one legacy codebase. Recruiters searching GeeksforGeeks' candidate pool had no purpose-built tooling, so shortlisting meant slow manual filtering. Meanwhile the internal organizational dashboard was a PHP monolith — slow page loads, painful to change, and increasingly expensive to maintain.",
    },
    {
      type: "architecture",
      diagram: "/diagrams/geeksforgeeks.svg",
      content:
        "The Recruiter Dashboard is a Next.js app with Redux state, talking to a Django API over the candidate pool, with five-plus composable filters (skills, experience, scores, and more) driving the search. The migration work replaced PHP-rendered modules with Next.js pages one module at a time — 30+ modules total — against the same backend, so the org could switch over incrementally instead of betting on a big-bang rewrite.",
    },
    {
      type: "decisions",
      items: [
        {
          decision: "Migrated the PHP dashboard module-by-module, not big-bang",
          why: "30+ modules meant a single cutover was guaranteed to break workflows for internal users. Incremental migration kept the old system as a fallback while each module was verified.",
        },
        {
          decision: "Made filters composable rather than building preset searches",
          why: "Recruiter queries vary too much for canned presets. Independent, stackable filters cover the long tail of searches with one mechanism.",
        },
        {
          decision: "Centralized dashboard state in Redux",
          why: "Filter state, result sets, and pagination interact across components; a single store kept the interactions predictable instead of threading props through the tree.",
        },
      ],
    },
    {
      type: "challenges",
      items: [
        {
          problem:
            "PHP modules had years of implicit behavior nobody had documented",
          fix: "Treated the running PHP pages as the spec: reproduced each module's actual behavior in Next.js, verified against the live system, then flipped that module over.",
        },
        {
          problem: "Search over a large candidate pool was slow with naive filtering",
          fix: "Pushed filtering into the Django API layer with indexed queries instead of filtering client-side, which is what cut candidate search time by ~40%.",
        },
      ],
    },
    {
      type: "evidence",
      items: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org" },
        { label: "Architecture diagram", asset: "/diagrams/geeksforgeeks.svg" },
      ],
    },
    {
      type: "outcome",
      content:
        "The Recruiter Dashboard serves 200+ active users and cut candidate search time by ~40%. The completed PHP → Next.js migration (30+ modules) improved page load performance by ~50% and reduced maintenance effort by ~35%.",
    },
  ],
};
