import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { RiMenu2Fill } from "react-icons/ri";

export const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

// Shared top nav. Without onNavigate it smooth-scrolls (classic layout);
// with onNavigate it calls back instead (3D layout drives the camera).
const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const itemClass =
    "cursor-pointer hover:text-white hover:bg-white/10 hover:rounded-md px-2 transition-colors";

  const renderItem = (section, afterClick) =>
    onNavigate ? (
      <button
        onClick={() => {
          onNavigate(section.id);
          afterClick?.();
        }}
        className="w-full text-left md:text-center"
      >
        {section.label}
      </button>
    ) : (
      <ScrollLink
        to={section.id}
        smooth={true}
        duration={500}
        onClick={afterClick}
      >
        {section.label}
      </ScrollLink>
    );

  return (
    <nav aria-label="Main" className="flex justify-center text-sm">
      <div className="bg-white/10 backdrop-blur-md text-white fixed w-full rounded-lg shadow-inner px-8 py-4 z-50">
        <ul className="hidden md:flex justify-center space-x-6">
          {SECTIONS.map((s) => (
            <li key={s.id} className={itemClass}>
              {renderItem(s)}
            </li>
          ))}
        </ul>

        <div className="md:hidden flex justify-left items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-xl"
            aria-label="Open menu"
          >
            <RiMenu2Fill />
          </button>

          {isMenuOpen && (
            <div className="absolute top-16 left-2 w-auto max-w-xs bg-white/10 backdrop-blur-md text-white text-left py-4 rounded-md">
              <ul>
                {SECTIONS.map((s) => (
                  <li key={s.id} className={`${itemClass} py-2`}>
                    {renderItem(s, () => setIsMenuOpen(false))}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
