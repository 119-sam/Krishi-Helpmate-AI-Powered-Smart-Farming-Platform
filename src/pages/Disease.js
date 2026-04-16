import React, { useState, useEffect } from "react";
import CommonDiseases from "../components/common_disease";
import PhotographyTips from "../components/tips_img";
import Footer from "../components/Footer";

const Disease = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simple Background Component
  const SimpleBackground = () => {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-amber-50/70 to-lime-100/90"></div>
      </div>
    );
  };

  // Interactive Card Component
  const InteractiveCard = ({ children, className = "", hoverGradient = "from-green-400/40 to-emerald-600/40" }) => {
    return (
      <div className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-102 hover:-translate-y-1 ${className}`}>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/20 to-emerald-600/20 backdrop-blur-sm border border-white/30 transition-all duration-500"></div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r ${hoverGradient} opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md"></div>
        <div className="relative p-8 h-full">{children}</div>
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${hoverGradient} opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl -z-10`}></div>
      </div>
    );
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setPrediction(null);

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/plant-diseases/predict", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        throw new Error('Prediction failed');
      }
      
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error("Prediction error:", err);
      alert("Error predicting disease. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="relative font-['Inter'] overflow-hidden min-h-screen">
      <SimpleBackground />
      
      {/* Hero Section */}
      <section className="relative py-12 border-b border-gray-200/50 mt-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-amber-50/80 to-lime-100/95 transition-all duration-2000"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4 transform transition-all duration-500 hover:scale-105">
            Plant Disease Detector
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Upload a photo of your plant to identify diseases instantly. Our AI-powered system analyzes plant images and provides accurate diagnosis.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-amber-50/80 to-lime-100/95 transition-all duration-2000"></div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <InteractiveCard className="transform transition-all duration-500 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                <i className="ri-upload-cloud-line text-green-600 text-lg"></i>
              </div>
              Upload Plant Image
            </h2>

            <div 
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 backdrop-blur-sm ${
                dragActive 
                  ? 'border-green-400 bg-green-50/80 scale-105' 
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50/50'
              } transform transition-all duration-300`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input 
                className="sr-only" 
                id="file-upload"
                accept="image/*" 
                type="file" 
                onChange={handleFileChange}
              />
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                  <span className="text-3xl text-green-600">📁</span>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {selectedFile ? selectedFile.name : "Drop your plant image here"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedFile ? "File selected" : "or click to browse from your device"}
                  </p>
                  
                  <label 
                    htmlFor="file-upload" 
                    className="whitespace-nowrap cursor-pointer font-medium rounded-xl transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 text-base mx-auto w-fit transform hover:scale-105 shadow-lg shadow-green-500/25"
                  >
                    <i className="ri-folder-upload-line mr-2"></i>
                    Choose File
                  </label>
                </div>
                
                <p className="text-sm text-gray-500">Supports: JPG, PNG, GIF (max 10MB)</p>
              </div>
            </div>

            {loading && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center px-6 py-3 font-semibold leading-6 text-sm shadow rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-500 transform transition-all duration-300">
                  <div className="flex space-x-1 mr-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  Analyzing plant image...
                </div>
              </div>
            )}

            {prediction && (
              <InteractiveCard className="mt-6 transform transition-all duration-500 hover:shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mr-3">
                    <i className="ri-bug-line text-red-600 text-lg"></i>
                  </div>
                  Disease Analysis Results
                </h2>

                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-red-800 mb-2">{prediction.disease}</h3>
                      <p className="text-red-700">
                        {prediction.scientific_name ? `Scientific name: ${prediction.scientific_name}` : 'Detailed analysis of plant disease symptoms and treatment.'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="bg-red-100 rounded-xl px-4 py-2 mb-2 transform transition-all duration-300 hover:scale-110">
                        <span className="text-sm font-medium text-red-800">{prediction.confidence}% Confidence</span>
                      </div>
                      <div className="bg-yellow-100 rounded-xl px-4 py-2 transform transition-all duration-300 hover:scale-110">
                        <span className="text-sm font-medium text-yellow-800">
                          {prediction.confidence > 80 ? 'High' : prediction.confidence > 60 ? 'Moderate' : 'Low'} Severity
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-white/50 rounded-xl transform transition-all duration-300 hover:scale-105">
                      <i className="ri-bug-line text-2xl text-red-600 mb-2"></i>
                      <p className="text-sm text-red-700">Disease Detected</p>
                      <p className="font-semibold text-red-800">{prediction.disease}</p>
                    </div>
                    <div className="text-center p-4 bg-white/50 rounded-xl transform transition-all duration-300 hover:scale-105">
                      <i className="ri-percent-line text-2xl text-red-600 mb-2"></i>
                      <p className="text-sm text-red-700">Confidence Level</p>
                      <p className="font-semibold text-red-800">{prediction.confidence}%</p>
                    </div>
                    <div className="text-center p-4 bg-white/50 rounded-xl transform transition-all duration-300 hover:scale-105">
                      <i className="ri-alert-line text-2xl text-red-600 mb-2"></i>
                      <p className="text-sm text-red-700">Status</p>
                      <p className="font-semibold text-red-800">
                        {prediction.is_healthy ? 'Healthy' : 'Diseased'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Symptoms Card */}
                  <div className="bg-blue-50 rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border border-blue-200/50">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                        <i className="ri-eye-line text-blue-600"></i>
                      </div>
                      Symptoms
                    </h3>
                    <ul className="space-y-2">
                      {['Brown to black lesions on leaves', 'White fuzzy growth on leaf undersides', 'Dark, greasy-looking spots on fruits', 'Rapid spreading in humid conditions'].map((symptom, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <i className="ri-checkbox-circle-fill text-blue-600 mt-1 text-sm"></i>
                          <span className="text-blue-700 text-sm">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Treatment Card */}
                  <div className="bg-green-50 rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border border-green-200/50">
                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                        <i className="ri-medicine-bottle-line text-green-600"></i>
                      </div>
                      Treatment
                    </h3>
                    <ul className="space-y-2">
                      {['Apply copper-based fungicide immediately', 'Remove and destroy affected plant parts', 'Improve air circulation around plants'].map((treatment, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <i className="ri-arrow-right-circle-fill text-green-600 mt-1 text-sm"></i>
                          <span className="text-green-700 text-sm">{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prevention Card */}
                  <div className="bg-purple-50 rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border border-purple-200/50">
                    <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
                        <i className="ri-shield-check-line text-purple-600"></i>
                      </div>
                      Prevention
                    </h3>
                    <ul className="space-y-2">
                      {['Plant resistant tomato varieties', 'Ensure proper spacing between plants', 'Water at soil level, not on leaves'].map((prevention, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <i className="ri-shield-fill text-purple-600 mt-1 text-sm"></i>
                          <span className="text-purple-700 text-sm">{prevention}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setPrediction(null)} 
                    className="whitespace-nowrap cursor-pointer font-medium rounded-xl transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 text-base transform hover:scale-105 shadow-lg shadow-green-500/25"
                  >
                    <i className="ri-upload-line mr-2"></i>Analyze Another Image
                  </button>
                  <button className="whitespace-nowrap cursor-pointer font-medium rounded-xl transition-all duration-300 flex items-center justify-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 text-base transform hover:scale-105">
                    <i className="ri-download-line mr-2"></i>Download Report
                  </button>
                </div>
              </InteractiveCard>
            )}
          </InteractiveCard>
        </div>
      </section>

      <CommonDiseases />
      <PhotographyTips />
      <Footer />
    </div>
  );
};

export default Disease;