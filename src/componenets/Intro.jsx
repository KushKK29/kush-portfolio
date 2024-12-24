import React, { useState, useEffect } from "react";
import image1 from "./MyPhoto.png";
import Lottie from "react-lottie";
import githubAnimation from "./Githubb.json"; // replace with your Lottie file path
import linkedinAnimation from "./LinkedInn.json"; // replace with your Lottie file path
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS

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

    // Adjust the amount of rotation on the X-axis based on the Y mouse position
    const rotateX = deltaY * 30; // More movement for stronger tilt
    const rotateY = deltaX * 30; // Optional, for some Y-axis tilt as well
    const moveZ = Math.min(Math.max(deltaX * 20, -20), 20); // Optional, control Z movement

    // Apply the transformations based on mouse position
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${moveZ}px)`,
      transition: "transform 0.1s ease-out",
    });
  };
  return (
    <div className="mt-0 flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen text-white p-8">
      {/* Left Section */}
      <div
        className="md:w-1/2 flex flex-col gap-4 "
        data-aos="fade-up" // Added AOS fade-up animation
        data-aos-duration="1000"
      >
        <div className="text-sm tracking-wider text-gray-400 uppercase">
          Dynamic Website Built Using React.js
        </div>
        <h1 className="text-5xl font-bold">Hi, there 👋</h1>
        <h2 className="text-4xl font-semibold">
          I'm <span className="text-blue-500">Kush Goel</span>
        </h2>
        <p className="text-2xl font-medium">
          I am into{" "}
          <span className="border-b-4 border-blue-500 text-blue-400 pb-1">
            {currentText}
          </span>
        </p>
        <button
          className="md:w-1/2 mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold tracking-wide transition duration-300"
          data-aos="zoom-in" // Added zoom-in animation on the button
          data-aos-duration="1000"
        >
          Know More
        </button>
        <div className="flex gap-4" data-aos="fade-up" data-aos-duration="1000">
          <a
            href="https://github.com/KushKK29"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 hover:scale-110"
          >
            <Lottie options={defaultOptionsGitHub} height={60} width={60} />
          </a>
          <a
            href="https://www.linkedin.com/in/kush-goel-004054277/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 hover:scale-110"
          >
            <Lottie options={defaultOptionsLinkedIn} height={60} width={60} />
          </a>
        </div>
      </div>

      {/* Right Section with Circular Image */}
      <div
        className="md:w-1/2 flex justify-center items-center"
        data-aos="fade-left"
        data-aos-duration="100"
        onMouseMove={handleMouseMove} // Apply the movement handler
      >
        <img
          src={image1}
          alt="Kush Goel"
          className="rounded-full shadow-lg w-40 h-40 sm:w-52 sm:h-52 md:w-72 md:h-72 lg:w-96 lg:h-96 object-contain transition duration-300 hover:scale-105"
          style={style} // Apply the dynamic style with Z-axis movement
        />
      </div>
    </div>
  );
};

export default Intro;
