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
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white w-full py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          <p className="text-lg mt-4 text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'm always open to discussing new opportunities and ideas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
          <div data-aos="fade-right">
            <form onSubmit={handleSubmit} className="bg-slate-700/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
              <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

                <div className="flex items-center gap-3">
                <input
                  name="agreed"
                  type="checkbox"
                  checked={formData.agreed}
                  onChange={handleChange}
                    className="w-5 h-5 rounded border-slate-600"
                  />
                  <label className="text-sm text-gray-300">
                    I agree to the privacy policy
                </label>
              </div>

            <button
              type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-[1.02]"
            >
                  Send Message
            </button>
              </div>
          </form>
          </div>

          {/* Contact Info */}
          <div data-aos="fade-left" className="space-y-8">
            <div className="bg-slate-700/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all">
                    <IoIosCall className="text-2xl text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-lg">+91-8279379218</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-all">
                    <MdOutlineEmail className="text-2xl text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-lg">kushgoel279@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all">
                    <CiLocationOn className="text-2xl text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-lg">Chandausi, 177209</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Quick Links
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {['Intro', 'Skills', 'Projects', 'Education', 'Experience'].map((item) => (
                <Link
                    key={item}
                    to={item.toLowerCase()}
                    className="px-4 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all text-center"
                  >
                    {item}
                </Link>
                ))}
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
