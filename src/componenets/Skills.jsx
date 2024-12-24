import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { TbBrandJavascript } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";
import { SiPython } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { FaCuttlefish } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

const Skills = () => {
  // Slider settings
  const settings = {
    infinite: true, // Infinite loop
    speed: 3000, // Speed of the slide
    slidesToShow: 5, // Show 5 cards at a time
    slidesToScroll: 1, // Scroll 1 card at a time
    autoplay: true, // Auto scroll
    autoplaySpeed: 1000, // Speed of autoplay
    cssEase: "linear",
    arrows: false, // Hide arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 cards on medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Show 1 card on small screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-center font-bold text-3xl relative my-5">
        <span className="relative group">
          Skills
          <span className="absolute bottom-0 left-0 w-0 h-[5px] rounded-md bg-blue-600 group-hover:w-full transition-all duration-300"></span>
        </span>
      </div>

      <div className="flex justify-center mt-5">
        <Slider {...settings} className="w-[80%]">
          {/* Skill Cards */}
          <div className="w-24 p-4 flex flex-col items-center text-white group">
            <FaHtml5 className="text-4xl mb-2 group-hover:scale-105 transition-all duration-300" />
            <span>HTML</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white group">
            <FaCss3Alt className="text-4xl mb-2 group-hover:scale-110 transition-all duration-300" />
            <span>CSS</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white group">
            <TbBrandJavascript className="text-4xl mb-2 group-hover:scale-110 transition-all duration-300" />
            <span>JavaScript</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white group">
            <SiExpress className="text-4xl mb-2 group-hover:scale-110 transition-all duration-300" />
            <span>Express.js</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white group">
            <FaNodeJs className="text-4xl mb-2 group-hover:scale-110 transition-all duration-300" />
            <span>Node.js</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white group">
            <SiMongodb className="text-4xl mb-2 group-hover:scale-110 transition-all duration-300" />
            <span>MongoDB</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white group">
            <FaCuttlefish className="text-4xl mb-2 group-hover:scale-110 transition-all duration-300" />
            <span>C</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white group">
            <TbBrandCpp className="text-4xl mb-2 group-hover:scale-110 transition-all duration-300" />
            <span>C++</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white group">
            <SiPython className="text-4xl mb-2 group-hover:scale-110 transition-all duration-300" />
            <span>Python</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white group">
            <FaDatabase className="text-4xl mb-2 group-hover:scale-110 transition-all duration-300" />
            <span>DSA</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white group">
            <SiGithub className="text-4xl mb-2 group-hover:scale-110 transition-all duration-300" />
            <span>GitHub</span>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Skills;
