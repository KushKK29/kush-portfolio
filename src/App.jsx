import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Projects from "./componenets/Projects";
import Header from "./componenets/Header";
import Intro from "./componenets/Intro";
import Skills from "./componenets/Skills";
import Experience from "./componenets/Experience";
import Education from "./componenets/Education";
import Contact from "./componenets/Contact";
const App = () => {
  return (
    <div className="bg-slate-800 min-h-screen text-white flex flex-col">
      <Header />
      <div className="mt-16">
        <Intro />
      </div>
      <Skills></Skills>
      <Projects></Projects>
      <Education></Education>
      <Experience></Experience>
      <Contact></Contact>
    </div>
  );
};

export default App;
