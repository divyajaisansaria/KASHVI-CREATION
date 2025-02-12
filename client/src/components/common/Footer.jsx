// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Your Company Name</h2>
          <p className="text-sm">© 2025 Your Company. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
