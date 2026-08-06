export default {
  slug: "trade-shala",
  type: "project",
  order: 5,
  title: "Trade-Shala",
  role: "Full-stack developer",
  timeframe: "2024 – 2025",
  oneLiner:
    "A paper-trading brokerage on live NSE tick data — raw broker WebSocket, protobuf decoding, and a server-side order engine with shorts and limit orders.",
  stack: [
    "React + TypeScript",
    "Node.js",
    "Express",
    "Socket.IO",
    "MongoDB",
    "Upstox API",
    "Protobuf",
    "Python (sentiment)",
  ],
  sections: [
    {
      type: "problem",
      content:
        "Most student trading projects fake the hard part: they poll a quotes API every few seconds and call it 'real-time', and their buy button just increments a number. Trade-Shala set a higher bar — stream actual NSE tick data live from a broker feed, and simulate a real brokerage on top of it: market and limit orders, short selling, portfolio accounting with average-price math, all settled server-side so the client can never cheat the money.",
    },
    {
      type: "architecture",
      diagram: "/diagrams/trade-shala.svg",
      content:
        "The React + TypeScript client holds a Socket.IO connection to the Node/Express server. When a user selects a symbol, the server authorizes a market-data feed with the Upstox broker API, opens a raw WebSocket to it, decodes the binary protobuf frames (MarketDataFeed.proto), and relays ticks to that client — one upstream feed per client, tracked in a socket-to-WebSocket map and torn down on disconnect. Orders, portfolio, and virtual balance live in MongoDB behind the order engine; node-schedule jobs fire at 9:15 and 15:30 IST to broadcast market open/close; a Python sentiment pipeline scores financial news for the recommendation side.",
    },
    {
      type: "decisions",
      items: [
        {
          decision:
            "Consumed the broker's raw WebSocket feed instead of polling a quotes REST API",
          why: "Tick-level updates are what make a trading UI feel real. Polling is rate-limited, seconds stale, and hammers the provider — the WS feed pushes every tick, at the cost of having to speak its binary protocol.",
        },
        {
          decision: "One upstream feed per client, mapped by socket id",
          why: "Each user watches their own symbol. A shared feed means subscription bookkeeping across users; a per-client feed keeps the lifecycle trivial — client disconnects, its upstream WebSocket closes with it.",
        },
        {
          decision:
            "All money math lives server-side: virtual balance, average-price recompute, PnL settlement",
          why: "Never trust the client with balances, even fake ones. Orders validate quantity, price, and buying power on the server; the portfolio recomputes weighted average price on every fill.",
        },
        {
          decision: "Modeled short selling as its own holding type",
          why: "The naive approach — credit cash when the user sells — double-counts. A short opens with no cash movement and settles PnL as (entry − exit) × quantity only when the position closes, which is how shorts actually work.",
        },
        {
          decision: "Self-ping every 10 minutes on the deployed server",
          why: "Render's free tier spins idle services down, which would kill live sockets and the market-hours scheduler. A keep-alive ping is inelegant and effective — the right trade at zero budget.",
        },
      ],
    },
    {
      type: "challenges",
      items: [
        {
          problem:
            "The Upstox feed isn't JSON — frames arrive as binary protobuf",
          fix: "Loaded the broker's MarketDataFeed.proto schema with protobufjs and decoded each buffer server-side before fan-out, so clients receive clean JSON ticks and never touch the wire format.",
        },
        {
          problem:
            "Browser disconnects were leaking upstream WebSocket connections",
          fix: "Every Socket.IO connection registers its upstream WS in a map keyed by socket id; the disconnect handler closes the feed and strips all listeners, so a user closing a tab can't strand a live broker connection.",
        },
        {
          problem:
            "Charts rendered ₹0.00 on weekends, holidays, and at market open",
          fix: "When the intraday candle fetch comes back empty, the API falls back to the last seven days of historical data — the client always has something real to draw.",
        },
        {
          problem: "Limit orders needed to fire on price, not on user action",
          fix: "Limit orders persist as pending; when the live price crosses the limit, the fulfillment path flips the order status and applies the portfolio and balance updates in one pass.",
        },
        {
          problem: "The UI had no idea whether the market was even open",
          fix: "Scheduled jobs at 9:15 and 15:30 IST (NSE hours) push market status over the socket, so the client gates trading actions and labels data as live or last-session.",
        },
      ],
    },
    {
      type: "evidence",
      items: [
        { label: "Live demo", url: "https://trade-shala-inky.vercel.app/" },
        { label: "GitHub repo", url: "https://github.com/KushKK29/Trade_Shala" },
        { label: "Architecture diagram", asset: "/diagrams/trade-shala.svg" },
      ],
    },
    {
      type: "outcome",
      content:
        "A functioning simulated brokerage on live NSE data: streaming ticks decoded from a binary broker feed, market and limit orders, short positions with correct PnL settlement, and news-sentiment signals — all running on free-tier infrastructure that stays alive by design. The parts that look easy on a resume line (real-time prices, a buy button) are exactly the parts that required protocol work, lifecycle management, and server-side accounting.",
    },
  ],
};
