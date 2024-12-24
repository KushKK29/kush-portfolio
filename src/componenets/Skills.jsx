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

const Skills = () => {
  // Slider settings
  const settings = {
    infinite: true, // Infinite loop
    speed: 3000, // Speed of the slide
    slidesToShow: 5, // Show 6 cards at a time
    slidesToScroll: 1, // Scroll 1 card at a time
    autoplay: true, // Auto scroll
    autoplaySpeed: 1000, // Speed of autoplay
    cssEase: "linear",
    arrows: false, // Smooth animation
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
          <div className="w-24 p-4 flex flex-col items-center text-white">
            <FaHtml5 className="text-4xl mb-2" />
            <span>HTML</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white">
            <FaCss3Alt className="text-4xl mb-2" />
            <span>CSS</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white">
            <TbBrandJavascript className="text-4xl mb-2" />
            <span>JavaScript</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white">
            <FaNodeJs className="text-4xl mb-2" />
            <span>Node.js</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white">
            <SiMongodb className="text-4xl mb-2" />
            <span>MongoDB</span>
          </div>
          <div className="w-24 p-4 flex flex-col items-center text-white">
            <TbBrandCpp className="text-4xl mb-2" />
            <span>C++</span>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Skills;
