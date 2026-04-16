import React, { useState, useEffect } from "react";

const CommonDiseases = () => {
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

  const diseases = [
    {
      id: 1,
      name: "Early Blight",
      description: "Fungal disease causing brown spots with concentric rings",
      image: "https://readdy.ai/api/search-image?query=Tomato%20early%20blight%20disease%20on%20plant%20leaves%20showing%20brown%20spots%20with%20concentric%20rings%2C%20plant%20pathology%2C%20agricultural%20disease%2C%20close-up%20leaf%20damage%2C%20farming%20plant%20health%2C%20disease%20identification&width=300&height=200&seq=early-blight&orientation=landscape",
      gradient: "from-orange-400/20 to-red-600/20",
      hoverGradient: "from-orange-400/40 to-red-600/40",
      emoji: "🍂"
    },
    {
      id: 2,
      name: "Powdery Mildew",
      description: "White powdery coating on leaves and stems",
      image: "https://readdy.ai/api/search-image?query=Powdery%20mildew%20disease%20on%20plant%20leaves%20showing%20white%20powdery%20coating%20on%20green%20leaves%2C%20plant%20pathology%2C%20agricultural%20disease%2C%20fungal%20infection%2C%20farming%20plant%20health%20issue&width=300&height=200&seq=powdery-mildew&orientation=landscape",
      gradient: "from-gray-400/20 to-slate-600/20",
      hoverGradient: "from-gray-400/40 to-slate-600/40",
      emoji: "🫧"
    },
    {
      id: 3,
      name: "Bacterial Spot",
      description: "Small dark spots with yellow halos on leaves",
      image: "https://readdy.ai/api/search-image?query=Bacterial%20spot%20disease%20on%20tomato%20leaves%20showing%20small%20dark%20spots%20with%20yellow%20halos%2C%20plant%20pathology%2C%20agricultural%20disease%2C%20bacterial%20infection%20on%20crops%2C%20farming%20plant%20health&width=300&height=200&seq=bacterial-spot&orientation=landscape",
      gradient: "from-yellow-400/20 to-amber-600/20",
      hoverGradient: "from-yellow-400/40 to-amber-600/40",
      emoji: "🟡"
    },
    {
      id: 4,
      name: "Mosaic Virus",
      description: "Mottled yellow and green patterns on leaves",
      image: "https://readdy.ai/api/search-image?query=Mosaic%20virus%20disease%20on%20plant%20leaves%20showing%20mottled%20yellow%20and%20green%20patterns%2C%20viral%20plant%20disease%2C%20agricultural%20pathology%2C%20crop%20health%20issue%2C%20farming%20disease%20identification&width=300&height=200&seq=mosaic-virus&orientation=landscape",
      gradient: "from-green-400/20 to-emerald-600/20",
      hoverGradient: "from-green-400/40 to-emerald-600/40",
      emoji: "🦠"
    },
  ];

  // Interactive Card Component
  const InteractiveCard = ({ children, disease, className = "" }) => {
    return (
      <div 
        className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${className}`}
        onMouseEnter={() => setHoveredCard(disease.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Card Background with Interactive Gradient */}
        <div 
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${disease.gradient} backdrop-blur-sm border border-white/30 transition-all duration-500`}
          style={{
            transform: hoveredCard === disease.id ? `rotate(${Math.sin(Date.now() / 1000) * 0.5}deg)` : 'rotate(0deg)'
          }}
        ></div>
        
        {/* Animated Border */}
        <div 
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${disease.hoverGradient} opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md`}
        ></div>

        {/* Card Content */}
        <div className="relative h-full overflow-hidden rounded-2xl">
          {children}
        </div>

        {/* Hover Effect Glow */}
        <div 
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${disease.hoverGradient} opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl -z-10`}
        ></div>
      </div>
    );
  };

  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background with interactive gradient */}
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
        {/* Header with animation */}
        <div className="text-center mb-12 transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Common Plant Diseases
          </h2>
        </div>

        {/* Diseases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {diseases.map((disease) => (
            <InteractiveCard 
              key={disease.id} 
              disease={disease}
              className="transform transition-all duration-500 hover:shadow-2xl"
            >
              {/* Image with overlay effect */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <img 
                  alt={disease.name} 
                  className="w-full h-32 object-cover transform transition-all duration-500 group-hover:scale-110" 
                  src={disease.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{disease.emoji}</span>
                  <h3 className={`font-semibold text-gray-900 transition-colors duration-300 ${
                    hoveredCard === disease.id ? 'text-green-700' : 'text-gray-900'
                  }`}>
                    {disease.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {disease.description}
                </p>
              </div>

              {/* Learn More Button */}
              <div className="px-4 pb-4">
                
              </div>
            </InteractiveCard>
          ))}
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-400/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-10 h-10 bg-yellow-400/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-green-400/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CommonDiseases;