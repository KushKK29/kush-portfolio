import React, { useState } from "react";
import { Link } from "react-scroll"; // Import Link from react-scroll
import { RiMenu2Fill } from "react-icons/ri";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex justify-center text-sm">
        <div className="bg-white/10 backdrop-blur-md text-white fixed w-full top-0 left-0 shadow-inner px-8 py-4 z-50">
          {" "}
          {/* Added z-50 */}
          {/* Desktop Menu */}
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
          {/* Mobile Menu */}
          <div className="md:hidden flex justify-between items-center">
            <button
              onClick={handleMenuToggle}
              className="text-white text-xl"
              aria-label="Toggle menu"
            >
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
    </>
  );
};

export default Header;
