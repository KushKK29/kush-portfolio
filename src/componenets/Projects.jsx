import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS
import { Link } from "react-router-dom";
import { caseStudies } from "../content";

const projectCaseStudies = caseStudies.filter((c) => c.type === "project");

const services = [
  {
    name: "Trade-Shala",
    description:
      "This project is based on paper trading and stock market simulation with integrated ML models for sentiment analysis.",
    videoUrl:
      "https://res.cloudinary.com/dtkjjaxwn/video/upload/v1750581551/erf4zskth9fqi5ymggob.mp4", // Directly use video1 as the URL
    githubRepo: "https://github.com/KushKK29/Trade_Shala",
    liveDemo: "https://trade-shala-inky.vercel.app/",
  },
  {
    name: "MHope - Paitent's AI Friend",
    description:
      "AI-based healthcare platform with smart dashboards and diagnostic tools for all users.",
    videoUrl:
      "https://res.cloudinary.com/dtkjjaxwn/video/upload/v1750583144/fvzvmyascjyscswgs6i5.mp4", // Replace with actual MHope video if different
    githubRepo: "https://github.com/KushKK29/Mhope", // Replace with your actual repo URL
    liveDemo: "https://m-hope.vercel.app/",
  },
  {
    name: "My-Chat-App",
    description:
      "This project is based on creating a chat application using React.js and socket.io. For achieving the real-time experience",
    videoUrl:
      "https://res.cloudinary.com/dtkjjaxwn/video/upload/v1750581848/sn3jo2zov2gpde8euljk.mp4", // Directly use video1 as the URL
    githubRepo: "https://github.com/KushKK29/My-Chat-App",
    liveDemo: "https://my-chat-app-uhe2.onrender.com/",
  },
  {
    name: "Sorting-Visualizer",
    description:
      "This project is based on various sorting algorithms and their visualizations.",
    videoUrl:
      "https://res.cloudinary.com/dtkjjaxwn/video/upload/v1750581780/y6d3kr0yv3jafmrtvad0.mp4", // Directly use video1 as the URL
    githubRepo: "https://github.com/KushKK29/Sorting-Visualiser",
    liveDemo: "https://sorting-visualiser-eosin.vercel.app/",
  },
  {
    name: "RBAC System",
    description:
      "This project is based on creating and distributing roles by the admin.",
    videoUrl:
      "https://res.cloudinary.com/dtkjjaxwn/video/upload/v1750581802/eh5fiathe3mwpluzl6py.mp4", // Directly use video1 as the URL
    githubRepo: "https://github.com/KushKK29/Rbac-Website",
    liveDemo: "https://rbac-website.vercel.app/",
  },
  {
    name: "AI Image Generator",
    description:
      "In this project, the image is generated using a machine learning model based on the prompt entered.",
    videoUrl:
      "https://res.cloudinary.com/dtkjjaxwn/video/upload/v1750581906/au23yzjlpzjbex6wzh8j.mp4", // Add the video URL here
    githubRepo:
      "https://github.com/KushKK29/react-peoject-2/tree/main/vite-project",
    liveDemo: "https://kushkk29.github.io/AI-Image-Generator/",
  },
  /* {
    name: "E-commerce Website",
    description: "This is my first project related to React.js.",
    videoUrl:
      "https://res.cloudinary.com/dtkjjaxwn/video/upload/v1750581886/prm375pouizdzdq3skyr.mp4", // Add the video URL here
    githubRepo: "https://github.com/KushKK29/E-Commerce_Website",
    liveDemo: "https://kushkk29.github.io/E-Commerce_Website/",
  }, */
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
              <span className="absolute bottom-0 left-0 w-0 h-[3px] rounded-md bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] group-hover:w-full transition-all duration-300"></span>
            </span>
          </div>

          {/* Deep-dive case studies */}
          <div className="mx-auto w-full max-w-5xl grid gap-5 sm:grid-cols-2">
            {projectCaseStudies.map((cs, i) => (
              <Link
                key={cs.slug}
                to={`/work/${cs.slug}`}
                data-aos="fade-up"
                data-aos-delay={`${(i % 2) * 100}`}
                className={`group relative flex flex-col justify-between bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all duration-300 ${
                  i === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3
                      className={`font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug ${
                        i === 0 ? "text-2xl" : "text-lg"
                      }`}
                    >
                      {cs.title}
                    </h3>
                    <span className="shrink-0 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all duration-300">
                      →
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-gray-500 mb-3">
                    {cs.role} · {cs.timeframe}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{cs.oneLiner}</p>
                </div>
                {cs.stack?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                    {cs.stack.slice(0, i === 0 ? 6 : 4).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] text-gray-500 px-2 py-0.5 border border-white/10 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
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
