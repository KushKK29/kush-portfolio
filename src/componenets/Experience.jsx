import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS

const experience = [
  {
    title: "Question Analyst",
    company: "Demlo AI",
    duration: "2023 - 2024",
    details: [
      "Reviewed and validated AI-generated questions for educational platforms.",
      "Ensured question quality and accuracy for various subjects.",
      "Analysed over 9000 questions of mathematics.",
    ],
  },
];

const Experience = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS animations
  }, []);

  return (
    <section className="py-8 px-4 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Experience
      </h2>
      <div className="relative border-l-4 border-blue-500 space-y-6">
        {experience.map((exp, index) => (
          <div
            key={index}
            data-aos="fade-up" // Apply AOS fade-up animation
            data-aos-delay={`${index * 200}`} // Add a delay for staggered animation
            className="relative bg-gray-800 p-6 rounded-lg shadow-lg border group border-gray-700 ml-8 hover:scale-105"
          >
            <div className="absolute -left-4 top-6 w-8 h-8 bg-blue-500 rounded-full border-4 border-gray-900 group-hover:border-slate-300"></div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-400">
                {exp.title}
              </h3>
              <span className="text-sm text-gray-400">{exp.duration}</span>
            </div>
            <p className="text-gray-300 font-medium mb-2">{exp.company}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              {exp.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
