export default {
  slug: "stock-analyser",
  type: "project",
  order: 4,
  title: "Stock Analyser on Hugging Face",
  role: "Solo developer",
  timeframe: "2025",
  oneLiner:
    "An AI stock-analysis app whose deployment to Hugging Face Spaces turned into a debugging saga worth writing down.",
  stack: ["Python", "Gradio", "Hugging Face Spaces", "yfinance"],
  sections: [
    {
      type: "problem",
      content:
        "The app itself — fetch market data, run analysis, present it through a web UI — worked locally on the first day. Getting it running on Hugging Face Spaces did not: three unrelated failures stacked on top of each other, each with a misleading error message. This case study is the problem → root cause → fix trail.",
    },
    {
      type: "architecture",
      diagram: "/diagrams/stock-analyser.svg",
      content:
        "A Gradio app hosted on Hugging Face Spaces: the UI calls Python analysis code, which pulls market data via yfinance and runs the analysis models. The browser frontend talks to the Space's API endpoint — which is where the CORS and SDK-version failures surfaced.",
    },
    {
      type: "decisions",
      items: [
        {
          decision: "Deployed on Hugging Face Spaces instead of a VPS",
          why: "Free GPU-adjacent hosting with zero server administration — the right trade for a portfolio-scale analysis app, even though the platform's pinned environments caused the bugs below.",
        },
        {
          decision: "Pinned exact dependency versions after the SDK mismatch",
          why: "Spaces builds resolve dependencies fresh on each push; unpinned versions meant the client and server could silently drift apart again. Version pins made the environment reproducible.",
        },
      ],
    },
    {
      type: "challenges",
      items: [
        {
          problem:
            "Client requests failed with opaque schema errors after deploy",
          fix: "Root cause: SDK version mismatch — the Gradio client library and the Gradio server on the Space were on incompatible versions, so the API contract between them had drifted. Pinning matching versions on both sides fixed it.",
        },
        {
          problem:
            "The Space crashed on startup with ModuleNotFoundError: audioop",
          fix: "Root cause: Python 3.13 removed the stdlib audioop module, and a transitive dependency (pulled in via the audio stack) still imported it. Fixed by pinning the Space's Python runtime to a version that still ships audioop rather than patching a third-party dependency.",
        },
        {
          problem: "Browser calls to the Space's API were blocked by CORS",
          fix: "The frontend origin wasn't accepted by the Space's endpoint. Fixed by serving the UI and API from the same origin via the Gradio app itself instead of fighting cross-origin headers on a platform I don't control.",
        },
      ],
    },
    {
      type: "evidence",
      items: [
        { label: "Architecture diagram", asset: "/diagrams/stock-analyser.svg" },
        { label: "Live on Hugging Face", url: "https://huggingface.co/spaces/Kush27/news-based-stock-analyser" },
      ],
    },
    {
      type: "outcome",
      content:
        "The app runs on Spaces with a pinned, reproducible environment. More useful than the app itself: a clean record of diagnosing three stacked platform failures — API contract drift, a removed stdlib module, and cross-origin policy — each traced to its actual root cause rather than worked around.",
    },
  ],
};
