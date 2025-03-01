import React, { useEffect } from "react";
import ecommerce from "./Ecommerce.mp4";
import tradeshala from "tradeshala.mp4";
import sorting from "./sorting.mp4";
import RBAC from "./Rbac.mp4";
import AI from "./AiGen.mp4";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS

const services = [
  {
    name: "Trade-Shala",
    description:
      "This project is based on paper trading and stock market simulation with integrated ML models for sentiment analysis.",
    videoUrl: tradeshala, // Directly use video1 as the URL
    githubRepo: "https://github.com/rishvant/Trade-Shala",
    liveDemo: "https://trade-shala.vercel.app/",
  },
  {
    name: "Sorting-Visualizer",
    description:
      "This project is based on various sorting algorithms and their visualizations.",
    videoUrl: sorting, // Directly use video1 as the URL
    githubRepo: "https://github.com/KushKK29/Sorting-Visualiser",
    liveDemo: "https://sorting-visualiser-eosin.vercel.app/",
  },
  {
    name: "RBAC System",
    description:
      "This project is based on creating and distributing roles by the admin.",
    videoUrl: RBAC, // Directly use video1 as the URL
    githubRepo: "https://github.com/KushKK29/rbac-context",
    liveDemo: "https://your-live-demo.com/rbac-system",
  },
  {
    name: "AI Image Generator",
    description:
      "In this project, the image is generated using a machine learning model based on the prompt entered.",
    videoUrl: AI, // Add the video URL here
    githubRepo:
      "https://github.com/KushKK29/react-peoject-2/tree/main/vite-project",
    liveDemo: "https://kushkk29.github.io/AI-Image-Generator/",
  },
  {
    name: "E-commerce Website",
    description: "This is my first project related to React.js.",
    videoUrl: ecommerce, // Add the video URL here
    githubRepo: "https://github.com/KushKK29/E-Commerce_Website",
    liveDemo: "https://kushkk29.github.io/E-Commerce_Website/",
  },
];

const Projects = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS animations
  }, []);

  return (
    <section className="py-16 mx-auto sm:py-20">
      <div className="mx-auto flex justify-center object-center px-4 py-16 sm:py-24 lg:max-w-7xl">
        <div className="flex justify-center object-center flex-col gap-12 sm:gap-16">
          <div className="flex justify-center font-bold text-3xl relative my-5">
            <span className="relative group hover:scale-110">
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-[3px] rounded-md bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </span>
          </div>

          <div className="mx-auto grid gap-12 space-y-10 md:space-y-0 sm:gap-16 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.name}
                data-aos="fade-up" // Add fade-up animation on scroll
                data-aos-delay={`${index * 200}`} // Add a delay for staggered animation
                className="group h-80 w-80 [perspective:1000px]"
              >
                <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front Face */}
                  <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
                    <video
                      className="object-fill cursor-pointer object-center h-full w-full rounded-xl"
                      src={service.videoUrl}
                      autoPlay
                      loop
                      muted
                    />
                    <p className="md:my-6 text-2xl">{service.name}</p>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex min-h-full flex-col items-center justify-center">
                      <h2 className="text-2xl font-bold mb-4">
                        {service.name}
                      </h2>

                      <p className="text-lg text-pretty text-center mb-4">
                        {service.description}
                      </p>

                      <div className="space-x-4">
                        <a
                          href={service.githubRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="my-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 w-auto rounded-full inline-flex items-center">
                            GitHub Repo
                          </button>
                        </a>

                        <a
                          href={service.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="my-2 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 w-auto rounded-full inline-flex items-center">
                            Live Demo
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
