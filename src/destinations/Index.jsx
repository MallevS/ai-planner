import React, { useState } from "react";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloudy, WiRain } from "react-icons/wi";
import { FiSearch } from "react-icons/fi";

function Destinations() {
  const [search, setSearch] = useState("");

  const destinations = [
    { name: "Tokyo", country: "Japan", temp: 22, weather: "Sunny" },
    { name: "Paris", country: "France", temp: 15, weather: "Cloudy" },
    { name: "New York", country: "USA", temp: 18, weather: "Rain" },
    { name: "Dubai", country: "UAE", temp: 30, weather: "Sunny" },
    { name: "Santorini", country: "Greece", temp: 25, weather: "Cloudy" },
    { name: "Bali", country: "Indonesia", temp: 28, weather: "Sunny" },
  ];

  const featuredExperiences = [
    { title: "Skydiving Over Dubai", location: "Dubai, UAE" },
    { title: "Hot Air Balloon Ride", location: "Cappadocia, Turkey" },
    { title: "Scuba Diving in Bali", location: "Bali, Indonesia" },
    { title: "Northern Lights Tour", location: "Reykjavík, Iceland" },
  ];

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Sunny":
        return <WiDaySunny className="text-yellow-400 text-4xl" />;
      case "Cloudy":
        return <WiCloudy className="text-gray-400 text-4xl" />;
      case "Rain":
        return <WiRain className="text-blue-400 text-4xl" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1b] to-[#1a1a3a] relative overflow-hidden flex flex-col items-center">
      {/* AI Background Glows */}
      <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-cyan-400 opacity-10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-80 h-80 bg-purple-500 opacity-10 blur-3xl rounded-full"></div>

      {/* AI Tagline */}
      <motion.p
        className="text-lg text-white/60 mt-12 tracking-wide uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        "AI-powered travel insights, tailored just for you."
      </motion.p>

      {/* Title */}
      <motion.h1
        className="mt-20 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Discover Stunning Destinations
      </motion.h1>

      {/* 🔍 AI Destination Search */}
      <div className="relative mt-8">
        <input
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-all"
        />
        <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 text-xl" />
      </div>

      {/* Destination Grid */}
      <motion.div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
        {destinations
          .filter((d) =>
            d.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((destination, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.05 }}
              className="relative p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 flex flex-col items-center justify-center transition-all cursor-pointer hover:border-cyan-400 transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
              <p className="text-sm text-white/60">{destination.country}</p>

              {/* AI Weather Info */}
              <div className="flex items-center gap-2 mt-3">
                {getWeatherIcon(destination.weather)}
                <span className="text-white/70">
                  {destination.temp}°C - {destination.weather}
                </span>
              </div>
            </motion.div>
          ))}
      </motion.div>

      {/* 🏆 Featured AI-Recommended Experiences */}
      <div className="mt-20 w-full max-w-6xl px-6">
        <motion.h2
          className="text-3xl text-center font-bold text-white mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          AI-Recommended Experiences
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredExperiences.map((exp, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 text-center text-white transition-all cursor-pointer hover:border-cyan-400"
            >
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <p className="text-sm text-white/60 mt-2">{exp.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Destinations;
