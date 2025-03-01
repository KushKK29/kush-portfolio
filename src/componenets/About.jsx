import React from "react";
import image1 from "./MyPhoto.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode, SiCodechef } from "react-icons/si";

const About = () => {
  return (
    <div className="py-12 md:py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get to know me better
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          <div 
            data-aos="fade-right"
            className="relative group px-4 md:px-0"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-800 ring-1 ring-slate-700/50 rounded-2xl overflow-hidden">
              <img 
                src={image1} 
                alt="Kush Goel" 
                className="w-full h-auto transform transition duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div 
            data-aos="fade-left"
            className="space-y-4 md:space-y-6 px-4 md:px-0"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Hi, I'm Kush Goel 👋
            </h3>
            
            <div className="prose prose-invert">
              <p className="text-gray-300 text-sm md:text-base">
                I'm a passionate Full Stack Developer and a B.Tech student at IIIT Una, 
                specializing in Electronics and Communication Engineering. With a strong 
                foundation in both frontend and backend development, I love creating 
                seamless web experiences.
              </p>
              
              <p className="text-gray-300 text-sm md:text-base mt-3 md:mt-4">
                My technical journey spans across various technologies including React, 
                Node.js, and MongoDB. I'm particularly interested in building scalable 
                web applications and solving complex problems through clean, efficient code.
              </p>

              <div className="mt-4 md:mt-6">
                <h4 className="text-base md:text-lg font-semibold text-blue-400 mb-2">Quick Facts:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1 md:space-y-2 text-sm md:text-base">
                  <li>🎓 Currently pursuing B.Tech at IIIT Una</li>
                  <li>💻 Full Stack Web Developer</li>
                  <li>🌱 Always learning new technologies</li>
                  <li>🎯 Focused on creating impactful solutions</li>
                </ul>
              </div>

              <div className="mt-6 md:mt-8">
                <h4 className="text-base md:text-lg font-semibold text-blue-400 mb-3 md:mb-4">Connect with me:</h4>
                <div className="flex space-x-4 md:space-x-6">
                  <a 
                    href="https://github.com/KushKK29" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transform hover:scale-110 transition-all"
                  >
                    <FaGithub className="text-2xl md:text-3xl" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/kush-goel-004054277/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transform hover:scale-110 transition-all"
                  >
                    <FaLinkedin className="text-2xl md:text-3xl" />
                  </a>
                  <a 
                    href="https://leetcode.com/u/Kush30/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-500 transform hover:scale-110 transition-all"
                  >
                    <SiLeetcode className="text-2xl md:text-3xl" />
                  </a>
                  <a 
                    href="https://www.codechef.com/users/kush279" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-brown-500 transform hover:scale-110 transition-all"
                  >
                    <SiCodechef className="text-2xl md:text-3xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 