// src/components/footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-plant-line text-2xl text-green-400"></i>
              </div>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "Pacifico, serif" }}
              >
                FarmTech
              </span>
            </div>
            <p className="text-gray-300 max-w-md">
              Empowering farmers with advanced technology for better crop
              management, disease detection, and weather forecasting.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a className="text-gray-300 hover:text-green-400 transition-colors duration-200" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-green-400 transition-colors duration-200" href="/ndvi">
                  NDVI Image
                </a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-green-400 transition-colors duration-200" href="/weather">
                  Weather Forecast
                </a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-green-400 transition-colors duration-200" href="/disease-detector">
                  Plant Disease Detector
                </a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-green-400 transition-colors duration-200" href="/chatbot">
                  ChatBot
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <i className="ri-mail-line"></i>
                <span>krishi@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-phone-line"></i>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-map-pin-line"></i>
                <span>123 Farm Street, Agriculture City</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 FarmTech. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://readdy.ai/?origin=logo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200"
            >
              Made with Readdy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
