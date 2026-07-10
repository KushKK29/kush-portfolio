import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MagicCursor from "./componenets/MagicCursor";
import SEO from "./componenets/SEO";
import PortfolioChatbot from "./componenets/PortfolioChatbot";
import Home from "./componenets/Home";

const App = () => {
  return (
    <div className="bg-slate-800 min-h-screen w-full text-white flex flex-col overflow-hidden">
      <SEO />
      <MagicCursor />
      <Home />
      <PortfolioChatbot />
    </div>
  );
};

export default App;
