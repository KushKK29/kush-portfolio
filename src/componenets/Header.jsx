import React from "react";

const Header = () => {
  return (
    <>
      <div className="flex justify-center text-sm">
        <div className="bg-white/10 backdrop-blur-md text-white fixed rounded-b-md shadow-inner px-8 py-4">
          <ul className="flex justify-center space-x-6">
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              Intro
            </li>
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              Projects
            </li>
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              Skills
            </li>
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              Education
            </li>
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              Experience
            </li>
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              Contact
            </li>
            <li className="cursor-pointer hover:text-gray-900 hover:bg-gray-600 hover:rounded-md px-2">
              About
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
