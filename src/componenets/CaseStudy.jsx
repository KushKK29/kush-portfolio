import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { caseStudies, getCaseStudy } from "../content";

const SectionTitle = ({ children }) => (
  <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-semibold text-white mb-5 tracking-tight">
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
      <SectionTitle>The problem</SectionTitle>
      <Prose>{s.content}</Prose>
    </>
  ),
  architecture: (s) => (
    <>
      <SectionTitle>Architecture</SectionTitle>
      {s.diagram && (
        <Panel className="mb-6 overflow-x-auto">
          <img
            src={s.diagram}
            alt="Architecture diagram"
            className="w-full min-w-[640px] max-w-4xl mx-auto"
          />
        </Panel>
      )}
      <Prose>{s.content}</Prose>
    </>
  ),
  decisions: (s) => (
    <>
      <SectionTitle>Key decisions — and why</SectionTitle>
      <ul className="space-y-4">
        {s.items.map((d, i) => (
          <li key={i}>
            <Panel>
              <p className="text-cyan-300 font-semibold mb-2">{d.decision}</p>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-gray-500 font-semibold">Why: </span>
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
      <SectionTitle>Obstacles &amp; how I debugged them</SectionTitle>
      <ul className="space-y-4">
        {s.items.map((c, i) => (
          <li key={i}>
            <Panel>
              <p className="text-amber-300 font-semibold mb-2">
                Problem: <span className="text-gray-200 font-normal">{c.problem}</span>
              </p>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-emerald-400 font-semibold">Fix: </span>
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
      <SectionTitle>Outcome</SectionTitle>
      <Prose>{s.content}</Prose>
    </>
  ),
  timeline: (s) => <Timeline items={s.items} />,
};

const TimelinePhase = ({ phase, index }) => {
  const [open, setOpen] = useState(false);
  const panelId = `timeline-panel-${index}`;
  return (
    <div className="relative pl-10">
      <span className="absolute left-0 top-6 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] ring-4 ring-slate-950" />
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full text-left bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-cyan-400/40 transition-colors duration-300"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs tracking-wide text-cyan-300">
            {String(index + 1).padStart(2, "0")} · {phase.range}
          </span>
          <span
            className={`text-gray-500 text-xs transition-transform duration-300 ${open ? "rotate-90" : ""}`}
            aria-hidden="true"
          >
            ▸
          </span>
        </div>
        <p className="font-semibold text-white text-lg mt-2">{phase.title}</p>
        <p className="font-mono text-xs text-gray-500 mt-1">{phase.repos}</p>
        <p className="text-gray-400 text-sm mt-2 leading-relaxed">{phase.insight}</p>
      </button>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-3 mb-2 pl-2 space-y-3 border-l border-white/10 ml-1">
            {phase.tasks.map((t, i) => (
              <div key={i} className="pl-4">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <span className="text-sm font-medium text-gray-200">{t[1]}</span>
                  <span className="font-mono text-xs text-cyan-300 whitespace-nowrap">{t[0]}</span>
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
    <SectionTitle>Timeline</SectionTitle>
    <div className="space-y-3">
      {items.map((phase, i) => (
        <TimelinePhase key={phase.title} phase={phase} index={i} />
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

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-black min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 text-gray-200 hover:text-white text-sm px-4 py-2 rounded-full transition-colors"
        >
          ← Back to portfolio
        </Link>

        {/* Header */}
        <header className="mt-10 mb-16">
          <p className="font-mono uppercase tracking-[0.1em] text-xs font-semibold text-cyan-300/80 mb-3">
            {study.type === "project" ? "Project case study" : "Experience case study"}
          </p>
          <h1
            className="text-[clamp(2.25rem,5vw,3rem)] font-bold mb-4 leading-[1.1] tracking-tight"
            style={{ textWrap: "balance" }}
          >
            {study.title}
          </h1>
          <p className="text-gray-400 mb-5">
            {study.role} · {study.timeframe}
          </p>
          <p className="text-xl text-gray-200 mb-6 max-w-[65ch] leading-relaxed">{study.oneLiner}</p>
          <div className="flex flex-wrap gap-2">
            {study.stack.map((t) => (
              <span
                key={t}
                className="bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm px-3 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* Sections */}
        <div className="space-y-16">
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
