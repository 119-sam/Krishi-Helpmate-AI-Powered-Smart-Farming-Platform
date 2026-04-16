import React, { useEffect, useState, useCallback } from "react";
import Footer from "../components/Footer";
import WeatherTips from "../components/WeatherTips";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("Ahmedabad");

  const API_KEY = "Your_OpenWeatherMap_API_Key_Here"; // Replace with your OpenWeatherMap API key

  // Simple Background Component
  const SimpleBackground = () => {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-amber-50/70 to-lime-100/90"></div>
      </div>
    );
  };

  // Interactive Card Component - FIXED: Removed cursor-pointer and transform
  const InteractiveCard = ({ children, className = "" }) => {
    return (
      <div className={`relative group transition-all duration-500 ${className}`}>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/20 to-emerald-600/20 backdrop-blur-sm border border-white/30 transition-all duration-500"></div>
        <div className="relative p-8 h-full">{children}</div>
      </div>
    );
  };

  const fetchWeatherData = useCallback(async (city) => {
    try {
      setLoading(true);
      setError(null);

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`
      );
      if (!weatherRes.ok) throw new Error(`Weather API error: ${weatherRes.status}`);
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&appid=${API_KEY}&units=metric`
      );
      if (!forecastRes.ok) throw new Error(`Forecast API error: ${forecastRes.status}`);
      const forecastData = await forecastRes.json();
      setForecast(forecastData);

      const { lat, lon } = weatherData.coord;
      try {
        const oneCallRes = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&exclude=minutely,hourly`
        );
        if (oneCallRes.ok) {
          const oneCallData = await oneCallRes.json();
          setAlerts(oneCallData.alerts || []);
        } else {
          setAlerts([]);
        }
      } catch (alertErr) {
        console.warn("Could not fetch alerts:", alertErr);
        setAlerts([]);
      }

    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  useEffect(() => {
    fetchWeatherData(searchQuery);
  }, [fetchWeatherData]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeatherData(searchQuery.trim());
    }
  };

  const getWeatherEmoji = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return "⛈️";
    if (weatherId >= 300 && weatherId < 400) return "🌧️";
    if (weatherId >= 500 && weatherId < 600) return "🌦️";
    if (weatherId >= 600 && weatherId < 700) return "❄️";
    if (weatherId >= 700 && weatherId < 800) return "🌫️";
    if (weatherId === 800) return "☀️";
    if (weatherId > 800) return "☁️";
    return "🌤️";
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getDailyForecast = () => {
    if (!forecast) return [];
    const daily = {};
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!daily[date]) {
        daily[date] = {
          min: item.main.temp_min,
          max: item.main.temp_max,
          weather: item.weather[0],
          date: item.dt,
          humidity: item.main.humidity,
          wind: item.wind.speed,
        };
      } else {
        daily[date].min = Math.min(daily[date].min, item.main.temp_min);
        daily[date].max = Math.max(daily[date].max, item.main.temp_max);
      }
    });
    return Object.values(daily).slice(0, 5);
  };

  if (loading) {
    return (
      <div className="relative min-h-screen flex justify-center items-center">
        <SimpleBackground />
        <div className="text-lg bg-white/80 backdrop-blur-sm rounded-xl p-8">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen flex justify-center items-center">
        <SimpleBackground />
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md">
          <h3 className="text-red-800 font-semibold">Error loading weather data</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const dailyForecast = getDailyForecast();

  return (
    <div className="relative font-['Inter'] overflow-hidden min-h-screen">
      <SimpleBackground />
      
      {/* Hero Section */}
      <section className="relative py-12 border-b border-gray-200/50 mt-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-amber-50/80 to-lime-100/95 transition-all duration-2000"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Weather Forecast
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get accurate weather information to make informed farming decisions.
          </p>
        </div>
      </section>

      {/* Search Section - FIXED: Added inputRef and autoFocus */}
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-amber-50/80 to-lime-100/95 transition-all duration-2000"></div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <InteractiveCard>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <input
                placeholder="Enter your location..."
                className="flex-1 px-4 py-3 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 text-sm bg-white/80 backdrop-blur-sm transition-all duration-300 focus:scale-105"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus // Added autoFocus
              />
              <button
                type="submit"
                className="whitespace-nowrap font-medium rounded-xl transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-base shadow-lg shadow-green-500/25"
                disabled={loading}
              >
                <span className="mr-2">🔍</span>
                {loading ? "Searching..." : "Get Weather"}
              </button>
            </form>
          </InteractiveCard>
        </div>
      </section>

      {/* Alerts */}
      {alerts.length > 0 && (
        <section className="relative py-4 overflow-hidden">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {alerts.map((alert, idx) => (
              <div key={idx} className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4 transition-all duration-300">
                <h3 className="font-semibold text-red-800 mb-2">{alert.event}</h3>
                <p className="text-red-700 text-sm">{alert.description}</p>
                <p className="text-xs mt-2 text-red-600">
                  From: {new Date(alert.start * 1000).toLocaleString()} - To:{" "}
                  {new Date(alert.end * 1000).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Current Weather */}
      {weather && (
        <section className="relative py-8 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-amber-50/80 to-lime-100/95 transition-all duration-2000"></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <InteractiveCard className="hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <span>🌡️</span>
                </div>
                Current Weather
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6 transition-all duration-500 hover:scale-110 hover:rotate-12">
                      <span className="text-2xl">{getWeatherEmoji(weather.weather[0].id)}</span>
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900">
                        {Math.round(weather.main.temp)}°C
                      </h3>
                      <p className="text-lg text-gray-600 capitalize">
                        {weather.weather[0].description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Humidity", value: `${weather.main.humidity}%`, emoji: "💧" },
                      { label: "Wind Speed", value: `${weather.wind.speed} m/s`, emoji: "💨" },
                      { label: "Pressure", value: `${weather.main.pressure} hPa`, emoji: "📊" },
                      { label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km`, emoji: "👁️" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white/50 rounded-xl p-4 text-center transition-all duration-300 backdrop-blur-sm">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-sm">{item.emoji}</span>
                        </div>
                        <p className="text-sm text-gray-600">{item.label}</p>
                        <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {weather.name}, {weather.sys.country}
                    </h3>
                    <div className="space-y-3 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Sunrise:</span>
                        <span className="font-medium bg-yellow-100 px-3 py-1 rounded-lg flex items-center">
                          <span className="mr-2">🌅</span>
                          {new Date(weather.sys.sunrise * 1000).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Sunset:</span>
                        <span className="font-medium bg-orange-100 px-3 py-1 rounded-lg flex items-center">
                          <span className="mr-2">🌇</span>
                          {new Date(weather.sys.sunset * 1000).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </div>
        </section>
      )}

      {/* Forecast */}
      {forecast && (
        <section className="relative py-8 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-amber-50/80 to-lime-100/95 transition-all duration-2000"></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <InteractiveCard className="hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                  <span>📅</span>
                </div>
                5-Day Forecast
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {dailyForecast.map((day, index) => (
                  <div
                    key={index}
                    className="bg-white/50 rounded-2xl p-6 text-center transition-all duration-300 backdrop-blur-sm border border-white/50"
                  >
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {index === 0 ? "Today" : formatDate(day.date)}
                    </h3>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                      <span className="text-xl">{getWeatherEmoji(day.weather.id)}</span>
                    </div>
                    <p className="text-sm text-gray-600 capitalize mb-3">
                      {day.weather.description}
                    </p>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-gray-900">
                        {Math.round(day.max)}°
                      </span>
                      <span className="text-gray-600">{Math.round(day.min)}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </InteractiveCard>
          </div>
        </section>
      )}

      {/* Weather Tips */}
      {weather && <WeatherTips weather={weather} />}

      <Footer />
    </div>
  );
};

export default WeatherPage;