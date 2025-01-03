import React, { useEffect, useState } from "react";
import { IoIosCall } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS
import { Link } from "react-scroll"; // Import react-scroll's Link component
import emailjs from "emailjs-com"; // Ensure EmailJS is imported

const Contact = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS animations
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Validate if user agreed to the privacy policy
    if (!formData.agreed) {
      alert("Please agree to the privacy policy.");
      return;
    }

    // Create template parameters to send via EmailJS
    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_x98onwn", // Replace with your EmailJS Service ID
        "template_7wbz7zl", // Replace with your EmailJS Template ID
        templateParams,
        "rVCAY7OUljkJotEN1" // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          console.log(
            "Email sent successfully!",
            response.status,
            response.text
          );
          alert("Thank you! Your message has been sent.");
        },
        (error) => {
          console.error("Failed to send email.", error);
          alert("Oops! Something went wrong. Please try again.");
        }
      );

    // Reset the form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      agreed: false,
    });
  };

  return (
    <div className="bg-slate-800 text-white w-full py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div
          className="text-center mb-10"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="text-3xl font-bold">Get In Touch</h1>
          <p className="text-lg mt-2">
            I would love to connect with you. Reach out to me through any of the
            following channels!
          </p>
        </div>

        {/* Contact Form */}
        <div
          className="text-black flex justify-center mb-6 rounded-lg "
          data-aos="fade-up"
        >
          <form
            onSubmit={handleSubmit}
            className="mt-6 bg-white p-4 rounded-lg"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold text-gray-900"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-2 border-gray-300 p-2 mt-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-2 border-gray-300 p-2 mt-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-2 border-gray-300 p-2 mt-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full rounded-md border-2 border-gray-300 p-2 mt-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              </div>
              <div className="flex gap-x-4 sm:col-span-2 items-center">
                <input
                  id="agreed"
                  name="agreed"
                  type="checkbox"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-2 border-gray-300"
                />
                <label htmlFor="agreed" className="text-sm text-gray-600">
                  By selecting this, you agree to our{" "}
                  <Link
                    to="/privacy-policy"
                    className="font-semibold text-indigo-600"
                  >
                    privacy&nbsp;policy
                  </Link>
                  .
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 mt-4 rounded-md hover:bg-indigo-500"
            >
              Let's talk
            </button>
          </form>
        </div>
        {/* Flex Layout for Columns */}
        <div className="flex flex-wrap justify-between space-x-6 space-y-6 md:space-y-0">
          {/* Left Column */}
          <div
            className="flex-1 bg-slate-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h2 className="text-2xl font-semibold mb-4">Kush's Portfolio</h2>
            <p className="text-lg">
              Thank you for visiting my personal portfolio website. Connect with
              me over socials.
            </p>
          </div>

          {/* Center Column */}
          <div
            className="flex-1 bg-slate-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-3 text-lg">
              <li>
                <Link
                  to="intro"
                  smooth={true}
                  duration={300}
                  className="hover:text-teal-400 cursor-pointer"
                >
                  Intro
                </Link>
              </li>
              <li>
                <Link
                  to="skills"
                  smooth={true}
                  duration={300}
                  className="hover:text-teal-400 cursor-pointer"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  to="projects"
                  smooth={true}
                  duration={300}
                  className="hover:text-teal-400 cursor-pointer"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="education"
                  smooth={true}
                  duration={1000}
                  className="hover:text-teal-400 cursor-pointer"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link
                  to="experience"
                  smooth={true}
                  duration={300}
                  className="hover:text-teal-400 cursor-pointer"
                >
                  Experience
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div
            className="flex-1 bg-slate-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
            <div className="space-y-3 text-lg">
              <p className="flex items-center space-x-2">
                <IoIosCall className="text-teal-400 transform transition duration-300 hover:scale-110" />
                <span>+91-8279379218</span>
              </p>
              <p className="flex items-center space-x-2">
                <MdOutlineEmail className="text-teal-400 transform transition duration-300 hover:scale-110" />
                <span>kushgoel279@gmail.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <CiLocationOn className="text-teal-400 transform transition duration-300 hover:scale-110" />
                <span>Chandausi, 177209</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
