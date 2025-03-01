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
const App = () => {
  return (
    <div className="bg-slate-800 min-h-screen text-white flex flex-col">
      {/* Add MagicCursor */}
      <MagicCursor />

      <div id="intro" className="mt-0">
        <Intro />
      </div>
      <div id="skills">
        <Skills />
      </div>
      
      <div id="projects">
        <Projects />
      </div>
      <div id="education">
        <Education />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default App;
