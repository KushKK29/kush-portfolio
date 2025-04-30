import React, { useState, useEffect } from "react";
import image1 from "./fghm.png";
import Lottie from "react-lottie";
import githubAnimation from "./Githubb.json"; // replace with your Lottie file path
import linkedinAnimation from "./LinkedInn.json"; // replace with your Lottie file path
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS
import { Link } from "react-scroll"; // Import Link from react-scroll
import { RiMenu2Fill } from "react-icons/ri"; // Import Menu Icon
import Leetcode from "./leetcode.png";
import Codechef from "./codechef.png";
import ScrollProgress from "./ScrollProgress";
const Intro = () => {
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

  // Header Component
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleResumeClick = () => {
    // Replace with your resume URL
    const resumeUrl =
      "https://drive.google.com/file/d/1wEEL_rz2nltDwzFE_gcnw2FMZEpXz2pb/view?usp=sharing";
    window.open(resumeUrl, "_blank");
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex justify-center text-sm">
        <div className="bg-white/10 backdrop-blur-md text-white fixed w-full rounded-lg shadow-inner px-8 py-4 z-50">
          <ul className="hidden md:flex justify-center space-x-6">
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              <Link to="intro" smooth={true} duration={500}>
                Intro
              </Link>
            </li>
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              <Link to="projects" smooth={true} duration={500}>
                Projects
              </Link>
            </li>
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              <Link to="skills" smooth={true} duration={500}>
                Skills
              </Link>
            </li>
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              <Link to="education" smooth={true} duration={500}>
                Education
              </Link>
            </li>
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              <Link to="experience" smooth={true} duration={500}>
                Experience
              </Link>
            </li>
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              <Link to="contact" smooth={true} duration={500}>
                Contact
              </Link>
            </li>
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              <Link to="about" smooth={true} duration={500}>
                About
              </Link>
            </li>
          </ul>

          <div className="md:hidden flex justify-left items-center">
            <button onClick={handleMenuToggle} className="text-white text-xl">
              <RiMenu2Fill />
            </button>

            {/* Mobile Menu Links */}
            {isMenuOpen && (
              <div className="absolute top-16 left-2 w-auto max-w-xs bg-white/10 backdrop-blur-md text-white text-left py-4 rounded-md">
                <ul>
                  <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2 py-2">
                    <Link
                      to="intro"
                      smooth={true}
                      duration={500}
                      onClick={handleMenuToggle}
                    >
                      Intro
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2 py-2">
                    <Link
                      to="projects"
                      smooth={true}
                      duration={500}
                      onClick={handleMenuToggle}
                    >
                      Projects
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2 py-2">
                    <Link
                      to="skills"
                      smooth={true}
                      duration={500}
                      onClick={handleMenuToggle}
                    >
                      Skills
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2 py-2">
                    <Link
                      to="education"
                      smooth={true}
                      duration={500}
                      onClick={handleMenuToggle}
                    >
                      Education
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2 py-2">
                    <Link
                      to="experience"
                      smooth={true}
                      duration={500}
                      onClick={handleMenuToggle}
                    >
                      Experience
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2 py-2">
                    <Link
                      to="contact"
                      smooth={true}
                      duration={500}
                      onClick={handleMenuToggle}
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2 py-2">
                    <Link
                      to="about"
                      smooth={true}
                      duration={500}
                      onClick={handleMenuToggle}
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollProgress />
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
              <button
                onClick={handleResumeClick}
                className="w-full md:w-1/2 mt-4 md:mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold tracking-wide transition duration-300"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                Download Resume
              </button>

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
                  <img src={Leetcode} className="h-8 w-8" alt="Leetcode" />
                </a>
                <a
                  href="https://www.codechef.com/users/kush279"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-14 h-14 hover:scale-110"
                >
                  <img src={Codechef} className="h-10 w-10" alt="Codechef" />
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
                src={image1}
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
