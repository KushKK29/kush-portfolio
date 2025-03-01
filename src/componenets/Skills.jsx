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

  const skillCards = [
    { icon: FaHtml5, name: "HTML", color: "text-orange-500" },
    { icon: FaCss3Alt, name: "CSS", color: "text-blue-500" },
    { icon: TbBrandJavascript, name: "JavaScript", color: "text-yellow-400" },
    { icon: SiExpress, name: "Express.js", color: "text-green-400" },
    { icon: FaNodeJs, name: "Node.js", color: "text-green-500" },
    { icon: SiMongodb, name: "MongoDB", color: "text-green-600" },
    { icon: FaCuttlefish, name: "C", color: "text-blue-400" },
    { icon: TbBrandCpp, name: "C++", color: "text-blue-600" },
    { icon: SiPython, name: "Python", color: "text-yellow-500" },
    { icon: FaDatabase, name: "DSA", color: "text-purple-500" },
    { icon: SiGithub, name: "GitHub", color: "text-gray-400" },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A showcase of my technical expertise and the technologies I work with
          </p>
      </div>

        <Slider {...settings} className="w-full">
          {skillCards.map((skill, index) => (
            <div key={index} className="px-4">
              <div className="bg-slate-700/30 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex flex-col items-center">
                  <skill.icon className={`text-5xl ${skill.color} mb-4`} />
                  <span className="text-white font-medium">{skill.name}</span>
          </div>
          </div>
          </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Skills;
