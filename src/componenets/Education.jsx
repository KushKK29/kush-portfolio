import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS

const education = [
  {
    degree: "B.Tech in ECE",
    institution: "Indian Institute of Information Technology, Una",
    duration: "2022 - 2026",
    details: [
      "Current CGPA: 9.03",
      "Relevant coursework: Embedded Systems, Digital Design, Machine Learning",
    ],
  },
  {
    degree: "Senior Secondary (12th)",
    institution: "RRK Sen. Sec. School, Chandausi",
    duration: "2019 - 2020",
    details: [
      "Percentage: 95.6%",
      "Stream: Science (PCM with Computer Science)",
    ],
  },
  {
    degree: "Secondary (10th)",
    institution: "RRK Sen. Sec. School, Chandausi",
    duration: "2017 - 2018",
    details: ["Percentage: 87%"],
  },
];

const Education = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS animations
  }, []);

  return (
    <section className="py-8 px-4 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-center font-bold text-3xl relative my-5">
        <span className="relative group hover:scale-110">
          Education
          <span className="absolute bottom-0 left-0 w-0 h-[3px] rounded-md bg-blue-600 group-hover:w-full transition-all duration-300"></span>
        </span>
      </div>
      <div className="relative border-l-4 border-green-500 space-y-6 ">
        {education.map((edu, index) => (
          <div
            key={index}
            data-aos="fade-up" // Apply AOS fade-up animation
            data-aos-delay={`${index * 200}`} // Add a delay for staggered animation
            className="relative bg-gray-800 p-6 rounded-lg shadow-lg border group border-gray-700 ml-8 hover:scale-110 hover:shadow-white hover:shadow-md"
          >
            <div className="absolute -left-4 top-6 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 group-hover:border-slate-300"></div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-green-400">
                {edu.degree}
              </h3>
              <span className="text-sm text-gray-400">{edu.duration}</span>
            </div>
            <p className="text-gray-300 font-medium mb-2">{edu.institution}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              {edu.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
