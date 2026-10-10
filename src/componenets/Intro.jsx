import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import githubAnimation from "./Githubb.json"; // replace with your Lottie file path
import linkedinAnimation from "./LinkedInn.json"; // replace with your Lottie file path
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS
import Leetcode from "./l1.gif";
import Codechef from "./codechef.png";
import Codolio from "./codolio.png";
import { useNavigate } from "react-router-dom";
const Intro = () => {
  const navigate = useNavigate();
  const defaultOptionsGitHub = {
    loop: true,
    autoplay: true, // Animation will play automatically
    animationData: githubAnimation, // Path to the GitHub animation JSON file
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsLinkedIn = {
    loop: true,
    autoplay: true, // Animation will play automatically
    animationData: linkedinAnimation, // Path to the LinkedIn animation JSON file
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const texts = [
    "Full Stack Web Development",
    "Software Development",
    "Backend Development",
  ];
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    AOS.init(); // Initialize AOS animations

    const typingInterval = setInterval(() => {
      if (charIndex < texts[index].length) {
        setCurrentText((prev) => prev + texts[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCharIndex(0);
          setCurrentText("");
          setIndex((prev) => (prev + 1) % texts.length);
        }, 1000); // Pause before clearing the text
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [charIndex, index, texts]);

  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const { clientX: mouseX, clientY: mouseY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = (mouseX - centerX) / centerX;
    const deltaY = (mouseY - centerY) / centerY;

    const rotateX = deltaY * 30;
    const rotateY = deltaX * 30;
    const moveZ = Math.min(Math.max(deltaX * 20, -20), 20);

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${moveZ}px)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleResumeClick = () => {
    // Replace with your resume URL
    const resumeUrl =
      "https://drive.google.com/file/d/1T5sMbowut_A7bCY4M-9T3NZK0lX-nYkT/view?usp=sharing";
    window.open(resumeUrl, "_blank");
  };

  return (
    <div className="relative">
      {/* Modified Intro Section */}
      <div className="min-h-screen flex items-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12">
            {/* Text Content */}
            <div
              className="md:w-1/2 flex flex-col gap-3 md:gap-4 text-center md:text-left"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="text-sm tracking-wider text-gray-400 uppercase">
                Dynamic Website Built Using React.js
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Hi, there 👋</h1>
              <h2 className="text-3xl md:text-4xl font-semibold">
                I'm <span className="text-blue-500">Kush Goel</span>
              </h2>
              <p className="text-xl md:text-2xl font-medium">
                I am into{" "}
                <span className="border-b-4 border-blue-500 text-blue-400 pb-1">
                  {currentText}
                </span>
              </p>
              <div
                className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-6 justify-center md:justify-start"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                <button
                  onClick={handleResumeClick}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold tracking-wide transition duration-300"
                >
                  Download Resume
                </button>
                <button
                  onClick={() => navigate("/work/humantic-ai")}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-md text-white font-semibold tracking-wide transition duration-300"
                >
                  View Experience
                </button>
              </div>

              {/* Social Links */}
              <div
                className="flex justify-center md:justify-start gap-4 mt-4"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <a
                  href="https://github.com/KushKK29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 hover:scale-110"
                >
                  <Lottie
                    options={defaultOptionsGitHub}
                    height={60}
                    width={60}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/kush-goel-004054277/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 hover:scale-110"
                >
                  <Lottie
                    options={defaultOptionsLinkedIn}
                    height={60}
                    width={60}
                  />
                </a>
                <a
                  href="https://leetcode.com/u/Kush30/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-8 h-8 hover:scale-110"
                >
                  <img src={Leetcode} className="h-8 w-8 scale-[1.9]" alt="Leetcode" />
                </a>
                <a
                  href="https://www.codechef.com/users/kush279"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 h-14 hover:scale-110"
                >
                  <img src={Codechef} className="h-10 w-10" alt="Codechef" />
                </a>
                <a
                  href="https://codolio.com/profile/kush_goel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 h-14 hover:scale-110"
                >
                  <img src={Codolio} className="h-10 w-10" alt="Codolio" />
                </a>
              </div>
            </div>

            {/* Image */}
            <div
              className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0"
              data-aos="fade-left"
              data-aos-duration="1000"
              onMouseMove={handleMouseMove}
            >
              <img
                src="https://res.cloudinary.com/dtkjjaxwn/image/upload/v1743262128/gcldnxjn7naqohten61y.png"
                alt="Kush Goel"
                className="rounded-full shadow-lg w-40 h-40 sm:w-52 sm:h-52 md:w-72 md:h-72 lg:w-96 lg:h-96 object-contain transition duration-300 hover:scale-105"
                style={style}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
