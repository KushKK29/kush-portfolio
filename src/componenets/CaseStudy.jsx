import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { caseStudies, getCaseStudy } from "../content";

const SectionTitle = ({ children, size = "default" }) => (
  <h2
    className={`font-semibold text-white mb-5 tracking-tight ${
      size === "lead"
        ? "text-[clamp(1.875rem,4vw,2.5rem)]"
        : "text-[clamp(1.25rem,2.4vw,1.5rem)]"
    }`}
  >
    {children}
  </h2>
);

const Prose = ({ children }) => (
  <p className="text-gray-300 leading-relaxed text-lg max-w-[70ch]" style={{ textWrap: "pretty" }}>
    {children}
  </p>
);

const Panel = ({ children, className = "" }) => (
  <div
    className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 ${className}`}
  >
    {children}
  </div>
);

const sectionRenderers = {
  problem: (s) => (
    <>
      <p className="font-mono text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">01 — Problem</p>
      <SectionTitle>The problem</SectionTitle>
      <Prose>{s.content}</Prose>
    </>
  ),
  architecture: (s) => (
    <>
      <p className="font-mono text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">02 — System</p>
      <SectionTitle>Architecture</SectionTitle>
      <div className="grid md:grid-cols-[3fr_2fr] gap-6 items-start">
        <Prose>{s.content}</Prose>
        {s.diagram && (
          <Panel className="overflow-x-auto md:order-first">
            <img
              src={s.diagram}
              alt="Architecture diagram"
              className="w-full min-w-[480px] md:min-w-0"
            />
          </Panel>
        )}
      </div>
    </>
  ),
  decisions: (s) => (
    <>
      <p className="font-mono text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">03 — Reasoning</p>
      <SectionTitle>Key decisions — and why</SectionTitle>
      <ul className="grid sm:grid-cols-2 gap-4">
        {s.items.map((d, i) => (
          <li key={i} className={s.items.length % 2 !== 0 && i === s.items.length - 1 ? "sm:col-span-2" : ""}>
            <Panel className="h-full">
              <p className="text-cyan-300 font-semibold mb-2 leading-snug">{d.decision}</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                <span className="text-gray-300 font-semibold">Why — </span>
                {d.why}
              </p>
            </Panel>
          </li>
        ))}
      </ul>
    </>
  ),
  challenges: (s) => (
    <>
      <p className="font-mono text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">04 — Debugging</p>
      <SectionTitle>Obstacles &amp; how I debugged them</SectionTitle>
      <ul className="grid sm:grid-cols-2 gap-4">
        {s.items.map((c, i) => (
          <li key={i} className={s.items.length % 2 !== 0 && i === s.items.length - 1 ? "sm:col-span-2" : ""}>
            <Panel className="h-full">
              <p className="text-amber-300 font-semibold mb-2 leading-snug">
                {c.problem}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                <span className="text-emerald-400 font-semibold">Fix — </span>
                {c.fix}
              </p>
            </Panel>
          </li>
        ))}
      </ul>
    </>
  ),
  evidence: (s) => (
    <>
      <p className="font-mono text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">05 — Proof</p>
      <SectionTitle>Evidence</SectionTitle>
      <div className="flex flex-wrap gap-3">
        {s.items.map((e, i) =>
          e.url ? (
            <a
              key={i}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full transition-colors"
            >
              {e.label} ↗
            </a>
          ) : e.asset ? (
            <a
              key={i}
              href={e.asset}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white py-2 px-4 rounded-full transition-colors"
            >
              {e.label}
            </a>
          ) : (
            <span className="bg-white/5 border border-white/10 text-gray-400 py-2 px-4 rounded-full" key={i}>
              {e.label}
            </span>
          )
        )}
      </div>
    </>
  ),
  outcome: (s) => (
    <>
      <p className="font-mono text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">07 — Outcome</p>
      <SectionTitle>Where it landed</SectionTitle>
      <Prose>{s.content}</Prose>
    </>
  ),
  timeline: (s) => <Timeline items={s.items} />,
};

const impactStyles = {
  high: "bg-emerald-400/10 border-emerald-400/30 text-emerald-300",
  medium: "bg-cyan-400/10 border-cyan-400/30 text-cyan-300",
  low: "bg-white/5 border-white/15 text-gray-400",
};

const ImpactBadge = ({ level }) => {
  if (!level || !impactStyles[level]) return null;
  return (
    <span
      className={`shrink-0 font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full border ${impactStyles[level]}`}
    >
      {level} impact
    </span>
  );
};

const TimelinePhase = ({ phase, index, total }) => {
  const [open, setOpen] = useState(false);
  const panelId = `timeline-panel-${index}`;
  const isLast = index === total - 1;
  return (
    <div className="relative pl-14 sm:pl-16">
      {!isLast && (
        <span className="absolute left-[21px] sm:left-[25px] top-10 bottom-[-1.5rem] w-px bg-gradient-to-b from-cyan-400/40 via-white/10 to-transparent" />
      )}
      <span className="absolute left-0 top-1 flex items-center justify-center w-11 h-11 sm:w-[3.25rem] sm:h-[3.25rem] rounded-full bg-slate-950 border border-cyan-400/30">
        <span className="font-mono text-xs sm:text-sm font-bold text-cyan-300">
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`w-full text-left bg-slate-900/60 backdrop-blur-xl border rounded-2xl p-5 transition-all duration-300 ${
          open ? "border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.12)]" : "border-white/10 hover:border-cyan-400/30"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="font-mono text-[11px] tracking-wide text-cyan-300/80">{phase.range}</span>
            <p className="font-semibold text-white text-lg sm:text-xl mt-1 leading-snug">{phase.title}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ImpactBadge level={phase.impact} />
            <span
              className={`text-gray-500 transition-transform duration-300 ${open ? "rotate-90 text-cyan-300" : ""}`}
              aria-hidden="true"
            >
              ▸
            </span>
          </div>
        </div>
        <p className="font-mono text-[11px] text-gray-500 mt-2 truncate">{phase.repos}</p>
        <p className="text-gray-400 text-sm mt-2 leading-relaxed">{phase.insight}</p>
      </button>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-3 mb-2 pl-4 space-y-3 border-l border-cyan-400/20 ml-1">
            {phase.tasks.map((t, i) => (
              <div key={i} className="pl-4 relative">
                <span className="absolute left-[-5px] top-2 w-[5px] h-[5px] rounded-full bg-cyan-400/60" />
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <span className="text-sm font-medium text-gray-200">{t[1]}</span>
                  <span className="font-mono text-[11px] text-cyan-300/70 whitespace-nowrap">{t[0]}</span>
                </div>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">{t[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline = ({ items }) => (
  <>
    <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
      <p className="font-mono text-xs tracking-[0.1em] uppercase text-gray-500">06 — Build log</p>
      <p className="font-mono text-[11px] text-gray-600">{items.length} phases</p>
    </div>
    <SectionTitle size="lead">The whole run, phase by phase</SectionTitle>
    <div className="space-y-6">
      {items.map((phase, i) => (
        <TimelinePhase key={phase.title} phase={phase} index={i} total={items.length} />
      ))}
    </div>
  </>
);

const CaseStudy = () => {
  const { slug } = useParams();
  const study = getCaseStudy(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (study) document.title = `${study.title} — Kush Goel`;
    return () => {
      document.title = "Kush Goel - Full Stack Developer";
    };
  }, [study]);

  if (!study) {
    return (
      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-black min-h-screen text-white flex flex-col items-center justify-center gap-4">
        <p className="text-2xl">Case study not found.</p>
        <Link to="/" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
          ← Back to portfolio
        </Link>
      </div>
    );
  }

  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const prev = caseStudies[idx - 1];
  const next = caseStudies[idx + 1];

  const timelineSection = study.sections.find((s) => s.type === "timeline");
  const phaseCount = timelineSection?.items?.length ?? null;
  const repoCount = timelineSection
    ? new Set(
        timelineSection.items.flatMap((p) => p.repos.split("·").map((r) => r.trim()))
      ).size
    : null;

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-black min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 text-gray-200 hover:text-white text-sm px-4 py-2 rounded-full transition-colors"
        >
          ← Back to portfolio
        </Link>

        {/* Header */}
        <header className="mt-10 mb-16">
          <p className="font-mono uppercase tracking-[0.1em] text-xs font-semibold text-cyan-300/80 mb-4">
            {study.type === "project" ? "Project case study" : "Experience case study"}
          </p>
          <h1
            className="text-[clamp(2.75rem,7vw,4.5rem)] font-bold mb-5 leading-[0.98] tracking-tight"
            style={{ textWrap: "balance" }}
          >
            {study.title}
          </h1>
          <p className="text-gray-400 mb-6">
            {study.role} · {study.timeframe}
          </p>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-[60ch] leading-snug font-medium">
            {study.oneLiner}
          </p>

          {phaseCount && (
            <div className="grid grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 mb-8 max-w-xl">
              {[
                { value: repoCount, label: "repos" },
                { value: phaseCount, label: "phases" },
                { value: study.timeframe.split("–")[0].trim(), label: "since" },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-900/80 px-4 py-4">
                  <p className="font-mono text-2xl sm:text-3xl font-bold text-cyan-300 leading-none">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-gray-500 mt-1.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {study.stack.map((t) => (
              <span
                key={t}
                className="text-gray-500 text-xs px-2.5 py-1 border border-white/10 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* Sections */}
        <div className="space-y-20">
          {study.sections.map((s, i) => {
            const render = sectionRenderers[s.type];
            return render ? <section key={i}>{render(s)}</section> : null;
          })}
        </div>

        {/* Prev / next nav */}
        <nav className="mt-20 pt-8 border-t border-white/10 flex justify-between gap-4 text-sm">
          {prev ? (
            <Link
              to={`/work/${prev.slug}`}
              className="text-gray-300 hover:text-cyan-300 transition-colors"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/work/${next.slug}`}
              className="text-gray-300 hover:text-cyan-300 text-right transition-colors"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
};

export default CaseStudy;
