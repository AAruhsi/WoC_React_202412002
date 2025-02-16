import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-gray-50 text-center py-6 mt-10">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CodeCanvas. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-2">
          <a href="#" className="hover:text-white transition duration-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
