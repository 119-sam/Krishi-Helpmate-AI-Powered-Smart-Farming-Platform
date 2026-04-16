import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import satelliteImage from "../assets/hq720.jpg";
import geoFarmerImage from "../assets/GeoFarmer-Satellite-pic.jpg";
import thirdImage from "../assets/1734932074586.jpeg";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [activeNDVI, setActiveNDVI] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Background images array
  const backgroundImages = [
    satelliteImage,
    geoFarmerImage,
    thirdImage
  ];

  // Auto slide every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [backgroundImages.length]);

  useEffect(() => {
    setIsVisible(true);
    
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setTimeOfDay('morning');
    else if (hour >= 12 && hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  const features = [
    {
      id: 1,
      title: "NDVI Image Analysis",
      description: "Analyze crop health using Normalized Difference Vegetation Index (NDVI) technology. Upload satellite or drone images to get detailed vegetation health reports.",
      icon: "ri-image-line",
      emoji: "🌱",
      link: "/ndvi",
      gradient: "from-green-400/20 to-emerald-600/20",
      hoverGradient: "from-green-400/40 to-emerald-600/40",
      bgGradient: "from-emerald-500/10 to-green-600/10"
    },
    {
      id: 2,
      title: "Weather Forecasting",
      description: "Get accurate weather predictions for your location. Access today's conditions, tomorrow's forecast, and extended weather outlook for better farming decisions.",
      icon: "ri-cloud-line",
      emoji: "🌤️",
      link: "/weather",
      gradient: "from-blue-400/20 to-cyan-600/20",
      hoverGradient: "from-blue-400/40 to-cyan-600/40",
      bgGradient: "from-sky-500/10 to-blue-600/10"
    },
    {
      id: 3,
      title: "Plant Disease Detection",
      description: "Upload photos of your crops to identify diseases early. Our AI-powered system analyzes plant images and provides instant disease diagnosis and treatment recommendations.",
      icon: "ri-bug-line",
      emoji: "🔍",
      link: "/disease",
      gradient: "from-red-400/20 to-orange-600/20",
      hoverGradient: "from-red-400/40 to-orange-600/40",
      bgGradient: "from-orange-500/10 to-red-600/10"
    },
    {
      id: 4,
      title: "AI ChatBot Assistant",
      description: "Get instant answers to your farming questions. Our intelligent chatbot provides expert advice on crop management, pest control, and agricultural best practices.",
      icon: "ri-chat-3-line",
      emoji: "🤖",
      link: "/chatbot",
      gradient: "from-purple-400/20 to-indigo-600/20",
      hoverGradient: "from-purple-400/40 to-indigo-600/40",
      bgGradient: "from-violet-500/10 to-purple-600/10"
    }
  ];

  const ndviFeatures = [
    {
      id: 1,
      title: "Crop Health Monitoring",
      description: "Identify areas of stress, disease, or nutrient deficiency in your crops.",
      icon: "ri-leaf-line",
      emoji: "🌿",
      color: "green"
    },
    {
      id: 2,
      title: "Yield Prediction",
      description: "Estimate crop yields based on vegetation health patterns.",
      icon: "ri-bar-chart-line",
      emoji: "📊",
      color: "blue"
    },
    {
      id: 3,
      title: "Resource Optimization",
      description: "Optimize irrigation, fertilization, and pest control strategies.",
      icon: "ri-settings-3-line",
      emoji: "⚙️",
      color: "purple"
    }
  ];

  const whyChooseFeatures = [
    {
      id: 1,
      title: "Improved Crop Health",
      description: "Monitor vegetation health with NDVI analysis to optimize irrigation and fertilization.",
      icon: "ri-plant-line",
      emoji: "🌾",
      gradient: "from-green-400/20 to-emerald-600/20"
    },
    {
      id: 2,
      title: "Early Disease Detection",
      description: "Identify plant diseases before they spread, saving crops and reducing losses.",
      icon: "ri-time-line",
      emoji: "⏰",
      gradient: "from-red-400/20 to-orange-600/20"
    },
    {
      id: 3,
      title: "Weather-Based Planning",
      description: "Make informed decisions about planting, harvesting, and field operations.",
      icon: "ri-weather-cloudy-line",
      emoji: "🌦️",
      gradient: "from-blue-400/20 to-cyan-600/20"
    },
    {
      id: 4,
      title: "Expert Guidance",
      description: "Access agricultural expertise anytime through our AI-powered assistant.",
      icon: "ri-lightbulb-line",
      emoji: "💡",
      gradient: "from-purple-400/20 to-indigo-600/20"
    }
  ];

  const diseaseFeatures = [
    {
      id: 1,
      title: "Simple Photo Upload",
      description: "Just take a photo and upload it for instant analysis.",
      icon: "ri-camera-line",
      emoji: "📸",
      color: "blue"
    },
    {
      id: 2,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning identifies diseases with high accuracy.",
      icon: "ri-brain-line",
      emoji: "🧠",
      color: "purple"
    },
    {
      id: 3,
      title: "Treatment Recommendations",
      description: "Get specific treatment and prevention strategies.",
      icon: "ri-medicine-bottle-line",
      emoji: "💊",
      color: "green"
    }
  ];

  // Navigation handler for ALL buttons
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Simple Background Component
  const SimpleBackground = () => {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Simple background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-amber-50/70 to-lime-100/90"></div>
      </div>
    );
  };

  // Animated background for sections with farming colors
  const AnimatedSectionBackground = ({ children, gradientFrom, gradientTo, pattern = true }) => {
    return (
      <section className="relative overflow-hidden">
        {/* Enhanced farming-themed gradient background */}
        <div 
          className="absolute inset-0 -z-10 transition-all duration-1000"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          }}
        ></div>
        
        {children}
      </section>
    );
  };

  // Interactive NDVI Feature Item
  const NDVIFeatureItem = ({ feature, index, isActive, onClick }) => {
    const colors = {
      green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-200' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-200' }
    };

    const color = colors[feature.color];

    return (
      <div
        className={`relative group cursor-pointer transition-all duration-500 transform ${
          isActive ? 'scale-105 -translate-y-2' : 'hover:scale-102 hover:-translate-y-1'
        }`}
        onClick={() => onClick(index)}
      >
        {/* Card Background */}
        <div 
          className={`absolute inset-0 rounded-3xl ${color.bg} ${
            isActive ? 'bg-opacity-80' : 'bg-opacity-60'
          } backdrop-blur-sm border border-white/30 transition-all duration-500`}
        ></div>
        
        {/* Animated Border */}
        <div 
          className={`absolute inset-0 rounded-3xl ${color.bg} opacity-0 ${
            isActive ? 'opacity-30' : ''
          } transition-all duration-500 blur-md`}
        ></div>

        {/* Card Content */}
        <div className="relative p-6">
          {/* Interactive Checkbox */}
          <div className="flex items-start space-x-4">
            <div 
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isActive 
                  ? `${color.bg} border-${feature.color}-500 scale-110` 
                  : 'border-gray-300 bg-white/80'
              }`}
            >
              {isActive && (
                <i className="ri-check-line text-white text-sm"></i>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className={`w-10 h-10 rounded-lg ${color.bg} flex items-center justify-center mr-3 transition-all duration-300 ${
                  isActive ? 'scale-110' : ''
                }`}>
                  <i className={`${feature.icon} ${color.text} text-lg`}></i>
                </div>
                <h4 className={`font-bold text-lg transition-colors duration-300 ${
                  isActive ? `text-${feature.color}-700` : 'text-gray-900'
                }`}>
                  {feature.title}
                </h4>
              </div>
              <p className="text-gray-600 leading-relaxed pl-13">
                {feature.description}
              </p>
            </div>
          </div>
        </div>

        {/* Hover Effect Glow */}
        <div 
          className={`absolute inset-0 rounded-3xl ${color.bg} opacity-0 ${
            isActive ? 'opacity-20' : ''
          } transition-all duration-500 blur-xl -z-10`}
        ></div>
      </div>
    );
  };

  return (
    <div className="relative font-['Inter'] overflow-hidden">
      <SimpleBackground />
      
      {/* ===== Hero Section with Slideshow ===== */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ 
          backgroundImage: `url(${backgroundImages[currentSlide]})`, 
          width: '100%', 
          height: '700px',
          transition: 'background-image 1s ease-in-out'
        }}
      >
        {/* Enhanced gradient overlay with smooth transparency at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-800/60 to-emerald-700/40"></div>
        
        {/* Additional bottom fade for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-50 to-transparent"></div>

        {/* Slideshow Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        <div 
          className={`relative z-10 max-w-3xl mx-auto px-6 text-center text-white transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Advanced Farming Technology <br /> 
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent animate-pulse">
              At Your Fingertips
            </span>
          </h1>

          {/* Text paragraph with cursor removed */}
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-white/10 p-4 rounded-2xl cursor-default">
            Revolutionize your farming with AI-powered crop analysis, weather forecasting, 
            disease detection, and expert guidance. Make data-driven decisions for better yields and healthier crops.
          </p>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => handleNavigation("")}
              className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center shadow-lg shadow-green-600/30 hover:shadow-green-600/50 cursor-pointer"
            >
              Get Started 
              <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center backdrop-blur-sm bg-white/20">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="relative py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Comprehensive Farming Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed cursor-default">
              Our platform combines cutting-edge technology with agricultural expertise to provide you with the tools you need for successful farming.
            </p>
          </div>

          {/* Features Grid with Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`relative group cursor-pointer transition-all duration-500 transform ${
                  hoveredCard === feature.id 
                    ? 'scale-105 -translate-y-2' 
                    : 'hover:scale-102 hover:-translate-y-1'
                }`}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Background with Interactive Gradient */}
                <div 
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} ${
                    hoveredCard === feature.id ? feature.hoverGradient : ''
                  } backdrop-blur-sm border border-white/30 transition-all duration-500`}
                ></div>

                {/* Card Content */}
                <div className="relative p-8 h-full">
                  {/* Icon with Emoji */}
                  <div 
                    className={`w-20 h-20 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center mb-6 transition-all duration-500 ${
                      hoveredCard === feature.id ? 'scale-110 rotate-6' : ''
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      hoveredCard === feature.id ? 'bg-green-500 scale-110 shadow-lg shadow-green-500/30' : 'bg-green-100'
                    }`}>
                      <span className="text-2xl">{feature.emoji}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                    hoveredCard === feature.id ? 'text-green-700' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed cursor-default">
                    {feature.description}
                  </p>

                  {/* Learn More Button */}
                  <button 
                    onClick={() => handleNavigation(feature.link)}
                    className={`whitespace-nowrap cursor-pointer font-medium rounded-xl transition-all duration-300 flex items-center justify-center px-6 py-3 text-base w-full ${
                      hoveredCard === feature.id 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' 
                      : 'bg-white/80 hover:bg-white text-green-800 backdrop-blur-sm'
                    } transform hover:scale-105 border border-white/50`}
                  >
                    Learn More 
                    <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Interactive NDVI Section ===== */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-50/50 to-lime-100/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="transform transition-all duration-700">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                What is <span className="text-green-600">NDVI</span>?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed cursor-default">
                NDVI (Normalized Difference Vegetation Index) is a powerful tool that measures vegetation health
                by analyzing the difference between visible and near-infrared light reflected by plants.
              </p>

              <div className="space-y-6">
                {ndviFeatures.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="relative group cursor-pointer transition-all duration-500 transform hover:scale-102 hover:-translate-y-1"
                  >
                    {/* Card Background */}
                    <div 
                      className="absolute inset-0 rounded-3xl bg-green-50 backdrop-blur-sm border border-white/30 transition-all duration-500"
                    ></div>
                    
                    {/* Card Content */}
                    <div className="relative p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 border-gray-300 bg-white/80">
                          <span className="text-sm">{feature.emoji}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3 transition-all duration-300">
                              <span className="text-lg">{feature.emoji}</span>
                            </div>
                            <h4 className="font-bold text-lg transition-colors duration-300 text-gray-900">
                              {feature.title}
                            </h4>
                          </div>
                          <p className="text-gray-600 leading-relaxed pl-13">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleNavigation("/ndvi")}
                className="mt-8 group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center shadow-lg shadow-green-600/30 cursor-pointer"
              >
                Try NDVI Analysis
                <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>

            {/* Image */}
            <div className="relative transform transition-all duration-700">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-white">
                <img
                  src="https://www.arable.com/wp-content/uploads/2022/05/NDVI-blog-header.jpg"
                  alt="NDVI Analysis Example"
                  className="object-cover w-full h-96"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== Interactive Plant Disease Detection Section ===== */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50/50 to-orange-100/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image on the left */}
            <div className="order-1 lg:order-1 transform transition-all duration-700">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-white">
                <img
                  alt="Plant Disease Detection"
                  src="https://readdy.ai/api/search-image?query=Plant%20disease%20detection%20AI%20technology%2C%20farmer%20taking%20photo%20of%20diseased%20plant%20leaf%20with%20smartphone%2C%20AI%20analysis%20interface%20showing%20disease%20identification%2C%20agricultural%20technology%2C%20crop%20health%20assessment%2C%20mobile%20farming%20app%2C%20plant%20pathology%20identification%2C%20digital%20agriculture%20tools%2C%20disease%20diagnosis%20technology%2C%20precision%20farming&width=600&height=400&seq=disease-detection&orientation=landscape"
                  className="object-cover w-full h-96"
                />
              </div>
            </div>

            {/* Text on the right */}
            <div className="order-2 lg:order-2 transform transition-all duration-700">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                AI-Powered Plant Disease Detection
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed cursor-default">
                Our advanced AI system can identify plant diseases from simple photos, helping you take immediate action to protect your crops and prevent spread.
              </p>

              <div className="space-y-6 mb-10">
                {diseaseFeatures.map((feature, index) => (
                  <div 
                    key={feature.id}
                    className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-green-50/50 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-green-200 group cursor-pointer transform hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-lg">{feature.emoji}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg group-hover:text-green-700 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 mt-2 cursor-default">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => handleNavigation("/disease")}
                  className="group whitespace-nowrap cursor-pointer font-medium rounded-xl transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Detect Disease
                  <i className="ri-upload-line ml-2 group-hover:translate-y-1 transition-transform duration-300"></i>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== Interactive Why Choose FarmTech Section ===== */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-50/50 to-cyan-100/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Why Choose <span className="text-green-600">Krishi Helpmate</span>?
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed cursor-default">
              Our technology-driven approach helps farmers increase productivity, reduce costs, and make informed decisions.
            </p>
          </div>

          {/* Grid of Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {whyChooseFeatures.map((feature, index) => (
              <div 
                key={feature.id}
                className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-transparent hover:border-green-200 cursor-pointer"
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <span className="text-3xl">{feature.emoji}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed cursor-default">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <button 
              onClick={() => handleNavigation("/chatbot")}
              className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center mx-auto shadow-lg shadow-green-600/30 cursor-pointer"
            >
              Start Your Farming Journey
              <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Dashboard;