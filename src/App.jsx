import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Projects from "./componenets/Projects";
import Intro from "./componenets/Intro";
import Skills from "./componenets/Skills";
import Experience from "./componenets/Experience";
import Education from "./componenets/Education";
import Contact from "./componenets/Contact";
import MagicCursor from "./componenets/MagicCursor";
import SEO from "./componenets/SEO";
const App = () => {
  return (
    <div className="bg-slate-800 min-h-screen w-full text-white flex flex-col overflow-hidden">
      {/* SEO Component */}
      <SEO />
      
      {/* Add MagicCursor */}
      <MagicCursor />

      <main>
        <section id="intro" className="mt-0">
          <Intro />
        </section>
        <section id="skills">
          <Skills />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default App;
