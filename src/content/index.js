// Auto-loads every case study in ./caseStudies — add a file there, it appears.
const modules = import.meta.glob("./caseStudies/*.js", { eager: true });

export const caseStudies = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const getCaseStudy = (slug) =>
  caseStudies.find((cs) => cs.slug === slug);
