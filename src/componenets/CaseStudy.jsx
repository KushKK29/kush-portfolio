import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { caseStudies, getCaseStudy } from "../content";

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
    {children}
  </h2>
);

const Prose = ({ children }) => (
  <p className="text-gray-300 leading-relaxed text-lg">{children}</p>
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
        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 mb-6 overflow-x-auto">
          <img
            src={s.diagram}
            alt="Architecture diagram"
            className="w-full min-w-[640px] max-w-4xl mx-auto"
          />
        </div>
      )}
      <Prose>{s.content}</Prose>
    </>
  ),
  decisions: (s) => (
    <>
      <SectionTitle>Key decisions — and why</SectionTitle>
      <ul className="space-y-5">
        {s.items.map((d, i) => (
          <li
            key={i}
            className="bg-gray-800/70 border border-gray-700 rounded-lg p-5"
          >
            <p className="text-blue-400 font-semibold mb-2">{d.decision}</p>
            <p className="text-gray-300">
              <span className="text-gray-500 font-semibold">Why: </span>
              {d.why}
            </p>
          </li>
        ))}
      </ul>
    </>
  ),
  challenges: (s) => (
    <>
      <SectionTitle>Obstacles &amp; how I debugged them</SectionTitle>
      <ul className="space-y-5">
        {s.items.map((c, i) => (
          <li
            key={i}
            className="bg-gray-800/70 border border-gray-700 rounded-lg p-5"
          >
            <p className="text-red-400 font-semibold mb-2">
              Problem: <span className="text-gray-200">{c.problem}</span>
            </p>
            <p className="text-gray-300">
              <span className="text-green-400 font-semibold">Fix: </span>
              {c.fix}
            </p>
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
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full"
            >
              {e.label} ↗
            </a>
          ) : e.asset ? (
            <a
              key={i}
              href={e.asset}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full"
            >
              {e.label}
            </a>
          ) : (
            <span
              key={i}
              className="bg-gray-800 border border-gray-600 text-gray-400 py-2 px-4 rounded-full"
            >
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
};

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
      <div className="bg-slate-800 min-h-screen text-white flex flex-col items-center justify-center gap-4">
        <p className="text-2xl">Case study not found.</p>
        <Link to="/" className="text-blue-400 underline">
          ← Back to portfolio
        </Link>
      </div>
    );
  }

  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const prev = caseStudies[idx - 1];
  const next = caseStudies[idx + 1];

  return (
    <div className="bg-slate-800 min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm">
          ← Back to portfolio
        </Link>

        {/* Header */}
        <header className="mt-6 mb-12">
          <p className="uppercase tracking-widest text-xs text-gray-500 mb-2">
            {study.type === "project" ? "Project case study" : "Experience case study"}
          </p>
          <h1 className="text-4xl font-bold mb-3">{study.title}</h1>
          <p className="text-gray-400 mb-4">
            {study.role} · {study.timeframe}
          </p>
          <p className="text-xl text-gray-200 mb-5">{study.oneLiner}</p>
          <div className="flex flex-wrap gap-2">
            {study.stack.map((t) => (
              <span
                key={t}
                className="bg-blue-900/50 border border-blue-700 text-blue-300 text-sm px-3 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* Sections */}
        <div className="space-y-14">
          {study.sections.map((s, i) => {
            const render = sectionRenderers[s.type];
            return render ? <section key={i}>{render(s)}</section> : null;
          })}
        </div>

        {/* Prev / next nav */}
        <nav className="mt-16 pt-8 border-t border-gray-700 flex justify-between gap-4 text-sm">
          {prev ? (
            <Link
              to={`/work/${prev.slug}`}
              className="text-blue-400 hover:text-blue-300"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/work/${next.slug}`}
              className="text-blue-400 hover:text-blue-300 text-right"
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
