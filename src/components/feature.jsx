import React from "react";

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Farming Solutions
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with agricultural expertise to provide you with the tools you need for successful farming.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* NDVI Image Analysis */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-image-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 ml-4">NDVI Image Analysis</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Analyze crop health using Normalized Difference Vegetation Index (NDVI) technology. Upload satellite or drone images to get detailed vegetation health reports.
            </p>
            <a href="/preview/e2a18d17-46f5-40ba-bcff-2cf413d94b25/2654987/ndvi" data-discover="true">
              <button type="button" className="whitespace-nowrap cursor-pointer font-medium rounded-lg transition-colors duration-200 flex items-center justify-center bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 text-base w-full">
                Learn More<i className="ri-arrow-right-line ml-2"></i>
              </button>
            </a>
          </div>

          {/* Weather Forecasting */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-cloud-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 ml-4">Weather Forecasting</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Get accurate weather predictions for your location. Access today's conditions, tomorrow's forecast, and extended weather outlook for better farming decisions.
            </p>
            <a href="/preview/e2a18d17-46f5-40ba-bcff-2cf413d94b25/2654987/weather" data-discover="true">
              <button type="button" className="whitespace-nowrap cursor-pointer font-medium rounded-lg transition-colors duration-200 flex items-center justify-center bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 text-base w-full">
                Learn More<i className="ri-arrow-right-line ml-2"></i>
              </button>
            </a>
          </div>

          {/* Plant Disease Detection */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-bug-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 ml-4">Plant Disease Detection</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Upload photos of your crops to identify diseases early. Our AI-powered system analyzes plant images and provides instant disease diagnosis and treatment recommendations.
            </p>
            <a href="/preview/e2a18d17-46f5-40ba-bcff-2cf413d94b25/2654987/disease-detector" data-discover="true">
              <button type="button" className="whitespace-nowrap cursor-pointer font-medium rounded-lg transition-colors duration-200 flex items-center justify-center bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 text-base w-full">
                Learn More<i className="ri-arrow-right-line ml-2"></i>
              </button>
            </a>
          </div>

          {/* AI ChatBot Assistant */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-chat-3-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 ml-4">AI ChatBot Assistant</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Get instant answers to your farming questions. Our intelligent chatbot provides expert advice on crop management, pest control, and agricultural best practices.
            </p>
            <a href="/preview/e2a18d17-46f5-40ba-bcff-2cf413d94b25/2654987/chatbot" data-discover="true">
              <button type="button" className="whitespace-nowrap cursor-pointer font-medium rounded-lg transition-colors duration-200 flex items-center justify-center bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 text-base w-full">
                Learn More<i className="ri-arrow-right-line ml-2"></i>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;