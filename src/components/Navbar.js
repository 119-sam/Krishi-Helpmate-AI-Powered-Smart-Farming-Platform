import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import krishilogo from "../assets/krishilogo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // NavLink styling function
  const getNavLinkClass = (isActive) => {
    return isActive 
      ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm' 
      : 'text-gray-700 hover:text-green-600 hover:bg-green-50';
  };

  const getMobileNavLinkClass = (isActive) => {
    return isActive 
      ? 'bg-green-50 text-green-700 border border-green-200' 
      : 'text-gray-700 hover:bg-gray-50 hover:text-green-600';
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white shadow-md'
    }`}>
      
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo - Fixed: Using the imported image */}
          <div className="flex items-center">
            <img 
              src={krishilogo} 
              alt="Krishi Helpmate Logo" 
              className="h-10 sm:h-12 w-auto"
              onError={(e) => {
                console.error("Failed to load logo:", krishilogo);
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${getNavLinkClass(isActive)}`
              }
            >
              Dashboard
            </NavLink>
            
            <NavLink
              to="/ndvi"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${getNavLinkClass(isActive)}`
              }
            >
              Satellite crop monitoring
            </NavLink>
            
            <NavLink
              to="/disease"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${getNavLinkClass(isActive)}`
              }
            >
              Disease
            </NavLink>
            
            <NavLink
              to="/chatbot"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${getNavLinkClass(isActive)}`
              }
            >
              Chatbot
            </NavLink>
            
            <NavLink
              to="/weather"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${getNavLinkClass(isActive)}`
              }
            >
              Weather
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden flex flex-col w-8 h-8 justify-center items-center space-y-1.5"
            onClick={toggleMobileMenu}
          >
            <span className={`w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${getMobileNavLinkClass(isActive)}`
              }
            >
              Dashboard
            </NavLink>
            
            <NavLink
              to="/ndvi"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${getMobileNavLinkClass(isActive)}`
              }
            >
              NDVI
            </NavLink>
            
            <NavLink
              to="/disease"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${getMobileNavLinkClass(isActive)}`
              }
            >
              Disease
            </NavLink>
            
            <NavLink
              to="/chatbot"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${getMobileNavLinkClass(isActive)}`
              }
            >
              Chatbot
            </NavLink>
            
            <NavLink
              to="/weather"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${getMobileNavLinkClass(isActive)}`
              }
            >
              Weather
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;