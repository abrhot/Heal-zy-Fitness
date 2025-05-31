// frontend/src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white p-4 text-center mt-8">
      <p>&copy; {new Date().getFullYear()} Heal-zy Fitness. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
