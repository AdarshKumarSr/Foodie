import React, { useState, useEffect } from "react";
import axios from "axios";

const emojis = ["🍅", "🥦", "🥕", "🌽", "🍆", "🥬", "🍄"];

const FallingEmoji = () => {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  const left = Math.random() * 100;
  const duration = 5 + Math.random() * 5;

  return (
    <span
      className="falling-emoji text-3xl absolute pointer-events-none select-none"
      style={{
        left: `${left}%`,
        animationDuration: `${duration}s`,
        top: "-2rem",
      }}
    >
      {randomEmoji}
    </span>
  );
};

const SuggestedFood = () => {
  const [food, setFood] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Load dark mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      setDarkMode(savedTheme === "true");
    }
  }, []);

  // ✅ Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const getFood = async () => {
    try {
      const res = await axios.get(
        "https://foodie-eqy0.onrender.com/api/food/random"
      );
      setFood(res.data);
    } catch (err) {
      console.error("Error fetching food:", err);
    }
  };

  return (
    <div
      className={`relative overflow-hidden min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-tr from-gray-900 via-black to-gray-800 text-white"
          : "bg-gradient-to-br from-green-100 via-lime-100 to-green-50 text-gray-900"
      }`}
    >
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-100%) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }

          .falling-emoji {
            animation-name: fall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
        `}
      </style>

      {/* Prevent Tailwind from purging dynamic classes */}
      <div className="hidden">
        bg-gradient-to-tr from-gray-900 via-black to-gray-800 text-white
        bg-gradient-to-br from-green-100 via-lime-100 to-green-50 text-gray-900
        bg-gray-900 bg-white bg-gray-800 text-gray-200 text-gray-800
        border-gray-300 border-gray-700 text-green-700 text-green-400
        hover:bg-gray-800 hover:bg-gray-300 hover:bg-green-600 hover:bg-green-700
      </div>

      {/* Falling Emojis */}
      {[...Array(20)].map((_, i) => (
        <FallingEmoji key={i} />
      ))}

      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className={`px-4 py-2 rounded-full shadow transition ${
            darkMode
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {darkMode ? "☀️ Day Mode" : "🌙 Night Mode"}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-16 z-10 relative">
        <h1
          className={`text-4xl font-extrabold mb-6 text-center drop-shadow-lg ${
            darkMode ? "text-white" : "text-green-900"
          }`}
        >
          Welcome! What do you want to eat today?
        </h1>

        <button
          onClick={getFood}
          className={`px-6 py-3 rounded-xl shadow-lg text-lg font-medium transition ${
            darkMode
              ? "bg-green-700 text-white hover:bg-green-600"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          🍽️ Get Suggested Food
        </button>

        {food && (
          <div
            className={`mt-10 p-6 rounded-2xl shadow-xl w-full max-w-xl text-left border transition ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-800"
            }`}
          >
            <h2
              className={`text-3xl font-semibold mb-3 ${
                darkMode ? "text-green-400" : "text-green-700"
              }`}
            >
              {food.name}
            </h2>
            <p className="text-lg">
              <strong>Recipe:</strong> {food.recipe}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestedFood;
