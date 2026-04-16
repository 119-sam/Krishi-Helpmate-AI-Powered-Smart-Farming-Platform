import React, { useRef, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  LayersControl,
  ImageOverlay,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import Footer from "../components/Footer";

// Fix for leaflet default icons
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Simple Background Component
const SimpleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-amber-50/70 to-lime-100/90"></div>
    </div>
  );
};

export default function NDVI() {
  const [searchText, setSearchText] = useState("");
  const [coords, setCoords] = useState([]);
  const [ndviData, setNdviData] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const featureGroupRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = async () => {
    if (!searchText) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`
      );
      const data = await res.json();
      if (data.length > 0 && mapInstance) {
        const { lat, lon } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);
        
        mapInstance.setView([latitude, longitude], 13);
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Error searching location");
    }
  };

  const fetchNDVIForPolygon = async (coordinates) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/ndvi/ndvi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coordinates }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();

      if (data.ndvi_url) {
        setNdviData(data);

        const lats = coordinates[0].map((c) => c[1]);
        const lons = coordinates[0].map((c) => c[0]);
        const bounds = [
          [Math.min(...lats), Math.min(...lons)],
          [Math.max(...lats), Math.max(...lons)],
        ];
        setMapBounds(bounds);
      } else {
        alert("NDVI data not available for this region.");
      }
    } catch (err) {
      console.error("Error fetching NDVI for polygon:", err);
      alert("Error fetching NDVI data.");
    }
  };

  const handleDrawCreate = (e) => {
    const layer = e.layer;
    const shape = layer.toGeoJSON();

    if (shape.geometry.type === "Polygon") {
      const coordinates = shape.geometry.coordinates;
      setCoords(coordinates);
      fetchNDVIForPolygon(coordinates);
    }
  };

  return (
    <div className="relative font-['Inter'] overflow-hidden">
      <SimpleBackground />
      
      {/* Hero Section with Farming Theme and Emojis */}
      <section className="relative py-16 bg-gradient-to-br from-emerald-500/10 to-green-600/10 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Emoji Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-3xl">🌱</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            NDVI Crop Health Analysis <span className="text-green-600">📊</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Draw your crop area or search a location to view NDVI imagery and
            assess vegetation health in real-time. <span className="text-green-500">📍</span>
          </p>
        </div>
      </section>

      {/* Search Section with Interactive Card and Emojis */}
      <section className="relative py-12 bg-gradient-to-br from-emerald-50/50 to-lime-100/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative group cursor-pointer transition-all duration-500 transform hover:scale-102 hover:-translate-y-1">
            {/* Card Background with Gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/20 to-emerald-600/20 backdrop-blur-sm border border-white/30 transition-all duration-500"></div>
            
            {/* Card Content */}
            <div className="relative p-8">
              {/* Section Title with Emoji */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-2xl">🔍</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Search Location <span className="text-green-600">🌍</span></h2>
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter region or coordinates... 🗺️"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/90 backdrop-blur-sm"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="group whitespace-nowrap font-medium rounded-lg px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center shadow-lg shadow-green-600/30"
                >
                  <span className="mr-2">🚀</span>
                  Search
                  <i className="ri-search-line ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section with Enhanced Styling and Emojis */}
      <section className="relative py-12 bg-gradient-to-br from-blue-50/50 to-cyan-100/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative group cursor-pointer transition-all duration-500 transform hover:scale-102 hover:-translate-y-1">
            {/* Card Background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-cyan-600/20 backdrop-blur-sm border border-white/30 transition-all duration-500"></div>
            
            {/* Card Content */}
            <div className="relative p-6">
              {/* Section Title with Emoji */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-2xl">🗺️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Interactive Map <span className="text-blue-600">🎯</span></h2>
              </div>

              <div className="mb-4 text-center">
                <p className="text-gray-600 flex items-center justify-center">
                  <span className="mr-2">📐</span>
                  Draw a polygon on the map to analyze NDVI
                  <span className="ml-2">🌿</span>
                </p>
              </div>

              <div style={{ height: "500px", width: "100%" }}>
                <MapContainer
                  center={[20.5937, 78.9629]}
                  zoom={5}
                  style={{ height: "100%", width: "100%" }}
                  whenCreated={setMapInstance}
                  zoomControl={true}
                >
                  <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Street Map 🏙️">
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="© OpenStreetMap contributors"
                      />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Satellite Map 🛰️">
                      <TileLayer
                        url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution="Tiles © Esri, Maxar"
                      />
                    </LayersControl.BaseLayer>
                  </LayersControl>

                  {ndviData?.ndvi_url && mapBounds && (
                    <ImageOverlay
                      url={ndviData.ndvi_url}
                      bounds={mapBounds}
                      opacity={0.6}
                    />
                  )}

                  <FeatureGroup ref={featureGroupRef}>
                    <EditControl
                      position="topright"
                      onCreated={handleDrawCreate}
                      draw={{
                        rectangle: true,
                        polygon: true,
                        circle: false,
                        polyline: false,
                        marker: false,
                        circlemarker: false,
                      }}
                      edit={{ remove: true }}
                    />
                  </FeatureGroup>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section with Interactive Cards and Emojis */}
      <section className="relative py-12 bg-gradient-to-br from-purple-50/50 to-violet-100/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative group cursor-pointer transition-all duration-500 transform hover:scale-102 hover:-translate-y-1">
            {/* Card Background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/20 to-indigo-600/20 backdrop-blur-sm border border-white/30 transition-all duration-500"></div>
            
            {/* Card Content */}
            <div className="relative p-6">
              {/* Section Title with Emoji */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-2xl">📊</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Analysis Results <span className="text-purple-600">🔬</span></h2>
              </div>

              {/* Coordinates */}
              {coords.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110">
                      <span className="text-xl">📍</span>
                    </div>
                    Selected Coordinates: <span className="ml-2">📌</span>
                  </h3>
                  <div className="text-sm text-gray-700 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/50">
                    {JSON.stringify(coords, null, 2)}
                  </div>
                </div>
              )}

              {/* NDVI Analysis */}
              {ndviData && (
                <div className="border-t border-white/30 pt-8">
                  <h3 className="text-lg font-semibold mb-6 flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110">
                      <span className="text-xl">🌿</span>
                    </div>
                    NDVI Analysis: <span className="ml-2">📈</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div 
                      className="relative group bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                      onMouseEnter={() => setHoveredCard('mean')}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className={`w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${hoveredCard === 'mean' ? 'scale-110 bg-green-200' : ''}`}>
                        <span className="text-xl">📏</span>
                      </div>
                      <p className="text-sm text-gray-600">Mean NDVI</p>
                      <p className="text-xl font-bold text-green-700 mt-1">
                        {ndviData.mean_ndvi?.toFixed(3) || "—"}
                      </p>
                    </div>
                    <div 
                      className="relative group bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                      onMouseEnter={() => setHoveredCard('min')}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className={`w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${hoveredCard === 'min' ? 'scale-110 bg-yellow-200' : ''}`}>
                        <span className="text-xl">📉</span>
                      </div>
                      <p className="text-sm text-gray-600">Min NDVI</p>
                      <p className="text-xl font-bold text-yellow-700 mt-1">
                        {ndviData.min_ndvi?.toFixed(3) || "—"}
                      </p>
                    </div>
                    <div 
                      className="relative group bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                      onMouseEnter={() => setHoveredCard('max')}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className={`w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${hoveredCard === 'max' ? 'scale-110 bg-green-200' : ''}`}>
                        <span className="text-xl">📈</span>
                      </div>
                      <p className="text-sm text-gray-600">Max NDVI</p>
                      <p className="text-xl font-bold text-green-700 mt-1">
                        {ndviData.max_ndvi?.toFixed(3) || "—"}
                      </p>
                    </div>
                    <div 
                      className="relative group bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                      onMouseEnter={() => setHoveredCard('health')}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className={`w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${hoveredCard === 'health' ? 'scale-110 bg-blue-200' : ''}`}>
                        <span className="text-xl">💚</span>
                      </div>
                      <p className="text-sm text-gray-600">Health Status</p>
                      <p className="text-lg font-bold text-green-700 mt-1">
                        {ndviData.health || "Analyzing..."}
                      </p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">💡</span>
                        <h4 className="font-semibold text-gray-900">What is NDVI?</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        NDVI measures vegetation health using light reflection analysis. Higher values indicate healthier plants! 🌱
                      </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">🎯</span>
                        <h4 className="font-semibold text-gray-900">How to Use</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Draw polygons on your field to get real-time vegetation health analysis! 📐
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* No Data Message */}
              {!ndviData && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">ℹ️</span>
                  </div>
                  <p className="text-gray-500 flex items-center justify-center">
                    <span className="mr-2">📐</span>
                    Draw a polygon on the map to see NDVI analysis results
                    <span className="ml-2">🌿</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Add global CSS fixes */}
      <style jsx global>{`
        /* Reset any problematic styles */
        .leaflet-container {
          background: #fff;
          outline: 0;
          border-radius: 12px;
        }
        
        .leaflet-control-container {
          font-family: inherit;
        }
        
        /* Ensure inputs work properly */
        input, button {
          font-family: inherit;
        }
        
        /* Remove any transform issues */
        .leaflet-pane,
        .leaflet-tile,
        .leaflet-marker-icon,
        .leaflet-marker-shadow,
        .leaflet-tile-container {
          position: absolute;
          left: 0;
          top: 0;
        }
        
        .leaflet-tile {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}