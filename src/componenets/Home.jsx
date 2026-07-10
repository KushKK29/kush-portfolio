import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header, { SECTIONS } from "./Header";
import ScrollProgress from "./ScrollProgress";
import Intro from "./Intro";
import Skills from "./Skills";
import Projects from "./Projects";
import Education from "./Education";
import Experience from "./Experience";
import Contact from "./Contact";

// three.js only loads when the 3D mode actually renders
const Scene3D = lazy(() => import("./Scene3D"));

const SECTION_COMPONENTS = {
  intro: Intro,
  skills: Skills,
  projects: Projects,
  education: Education,
  experience: Experience,
  contact: Contact,
};

const supports3D = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  if (window.innerWidth < 768) return false; // ponytail: no WebGL on small screens, classic layout is the mobile experience
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

const ClassicHome = () => (
  <>
    <Header />
    <ScrollProgress />
    <main>
      {SECTIONS.map(({ id }) => {
        const Section = SECTION_COMPONENTS[id];
        return (
          <section id={id} key={id}>
            <Section />
          </section>
        );
      })}
    </main>
  </>
);

const SceneLoader = () => (
  <div className="h-full w-full flex flex-col items-center justify-center gap-4 text-gray-400">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    <p className="text-sm">Loading 3D scene…</p>
  </div>
);

const Home = () => {
  const canUse3D = useMemo(supports3D, []);
  const [mode, setMode] = useState(() =>
    canUse3D ? localStorage.getItem("navMode") || "classic" : "classic"
  );
  const [focus, setFocus] = useState(null);

  const toggleMode = () => {
    const next = mode === "3d" ? "classic" : "3d";
    setMode(next);
    localStorage.setItem("navMode", next);
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setFocus(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const modeToggle = canUse3D && (
    <button
      onClick={toggleMode}
      className={`fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-md border text-xs px-3 py-2 rounded-full transition-colors ${
        mode === "3d"
          ? "border-gray-600 text-gray-200 hover:bg-white/20"
          : "border-cyan-400/40 text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.5)] hover:bg-white/20"
      }`}
    >
      {mode !== "3d" && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
        </span>
      )}
      {mode === "3d" ? "Switch to classic view" : "Switch to 3D view"}
    </button>
  );

  if (mode !== "3d")
    return (
      <>
        <ClassicHome />
        {modeToggle}
      </>
    );

  const Focused = focus ? SECTION_COMPONENTS[focus] : null;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Real, keyboard-navigable nav — the 3D canvas below is decorative duplication */}
      <Header onNavigate={setFocus} />

      <div aria-hidden="true" className="absolute inset-0">
        <Suspense fallback={<SceneLoader />}>
          <Scene3D focus={focus} onFocus={setFocus} />
        </Suspense>
      </div>

      {!focus && (
        <p className="absolute bottom-6 w-full text-center text-gray-400 text-sm pointer-events-none">
          Click a panel — or use the menu — to fly to a section
        </p>
      )}

      <AnimatePresence>
        {Focused && (
          <motion.div
            key={focus}
            initial={{ opacity: 0, x: 120 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.45, duration: 0.35, ease: "easeOut" },
            }}
            exit={{ opacity: 0, x: 120, transition: { duration: 0.2 } }}
            className="no-aos absolute top-0 right-0 h-full w-full lg:w-[64rem] lg:max-w-[80vw] bg-slate-900/95 backdrop-blur-md overflow-y-auto overflow-x-hidden z-40 pt-16 shadow-2xl"
          >
            <button
              onClick={() => setFocus(null)}
              className="sticky top-2 ml-4 z-10 bg-gray-700/80 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-full"
            >
              ✕ Close (Esc)
            </button>
            <Focused />
          </motion.div>
        )}
      </AnimatePresence>

      {modeToggle}
    </div>
  );
};

export default Home;
