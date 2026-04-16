import React, { useState, useEffect } from "react";

const WeatherTips = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const farmingTips = [
    {
      id: 1,
      icon: "ri-plant-line",
      emoji: "🌾",
      message: "Good conditions for planting winter wheat today",
      gradient: "from-green-400/20 to-emerald-600/20",
      hoverGradient: "from-green-400/40 to-emerald-600/40"
    },
    {
      id: 2,
      icon: "ri-water-line",
      emoji: "💧",
      message: "Heavy rain expected Wednesday - delay irrigation and protect crops",
      gradient: "from-blue-400/20 to-cyan-600/20",
      hoverGradient: "from-blue-400/40 to-cyan-600/40"
    },
    {
      id: 3,
      icon: "ri-sun-line",
      emoji: "☀️",
      message: "Sunny weather tomorrow perfect for harvesting",
      gradient: "from-yellow-400/20 to-orange-600/20",
      hoverGradient: "from-yellow-400/40 to-orange-600/40"
    },
    {
      id: 4,
      icon: "ri-wind-line",
      emoji: "💨",
      message: "Strong winds Wednesday - secure equipment and avoid spraying",
      gradient: "from-purple-400/20 to-indigo-600/20",
      hoverGradient: "from-purple-400/40 to-indigo-600/40"
    },
  ];

  // Interactive Card Component
  const InteractiveCard = ({ children, tip, className = "" }) => {
    return (
      <div 
        className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-102 hover:-translate-y-1 ${className}`}
        onMouseEnter={() => setHoveredCard(tip.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Card Background with Interactive Gradient */}
        <div 
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tip.gradient} backdrop-blur-sm border border-white/30 transition-all duration-500`}
          style={{
            transform: hoveredCard === tip.id ? `rotate(${Math.sin(Date.now() / 1000) * 0.5}deg)` : 'rotate(0deg)'
          }}
        ></div>
        
        {/* Animated Border */}
        <div 
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tip.hoverGradient} opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md`}
        ></div>

        {/* Card Content */}
        <div className="relative p-6 h-full">
          {children}
        </div>

        {/* Hover Effect Glow */}
        <div 
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tip.hoverGradient} opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl -z-10`}
        ></div>
      </div>
    );
  };

  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background with floating particles effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-amber-50/80 to-lime-100/95 transition-all duration-2000"></div>
        <div 
          className="absolute inset-0 opacity-60 transition-all duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)`
          }}
        ></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Header with animation */}
          <div className="text-center mb-8 transform transition-all duration-500 hover:scale-105">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Weather-Based Farming Tips
            </h2>
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {farmingTips.map((tip) => (
              <InteractiveCard 
                key={tip.id} 
                tip={tip}
                className="transform transition-all duration-500 hover:shadow-2xl"
              >
                <div className="flex items-start space-x-4">
                  {/* Icon with animation and emoji */}
                  <div 
                    className={`w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 flex-shrink-0`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      hoveredCard === tip.id ? 'bg-green-500 scale-110 shadow-lg shadow-green-500/30' : 'bg-green-100'
                    }`}>
                      <span className="text-lg">{tip.emoji}</span>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium transition-colors duration-300 ${
                      hoveredCard === tip.id ? 'text-green-800' : 'text-gray-800'
                    }`}>
                      {tip.message}
                    </p>
                  </div>

                  {/* Voice Button with animation */}
                  <button
                    className="p-2 rounded-xl hover:bg-white/50 transition-all duration-300 cursor-pointer transform hover:scale-110 group/voice"
                    title="Read tip aloud"
                  >
                    <span className="text-sm">🔊</span>
                  </button>
                </div>
              </InteractiveCard>
            ))}
          </div>

          {/* Floating decorative elements with emojis */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400/20 rounded-full animate-pulse flex items-center justify-center">
            <span className="text-xs">🌱</span>
          </div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-400/20 rounded-full animate-pulse flex items-center justify-center" style={{animationDelay: '1s'}}>
            <span className="text-xs">🌞</span>
          </div>
          <div className="absolute top-1/2 -right-8 w-4 h-4 bg-blue-400/20 rounded-full animate-pulse flex items-center justify-center" style={{animationDelay: '2s'}}>
            <span className="text-xs">💦</span>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(1deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WeatherTips;