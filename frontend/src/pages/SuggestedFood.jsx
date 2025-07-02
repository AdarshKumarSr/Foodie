import React, { useState } from "react";
import axios from "axios";

const emojis = ["🍅", "🥦", "🥕", "🌽", "🍆", "🥬", "🍄"];

const FallingEmoji = () => {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  const left = Math.random() * 100;
  const duration = 5 + Math.random() * 5;

  return (
    <span
      className="falling-emoji text-3xl absolute pointer-events-none"
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
      {/* Inline CSS for falling animation */}
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

      {/* Falling Emojis */}
      {[...Array(20)].map((_, i) => (
        <FallingEmoji key={i} />
      ))}

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-full shadow ${
            darkMode
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {darkMode ? "☀️ Day Mode" : "🌙 Night Mode"}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-16 z-10 relative">
        <h1 className="text-4xl font-extrabold mb-6 text-center drop-shadow-lg">
          Welcome! What do you want to eat today?
        </h1>

        <button
          onClick={getFood}
          className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-xl shadow-lg text-lg font-medium"
        >
          🍽️ Get Suggested Food
        </button>

        {food && (
          <div className="mt-10 bg-white/80 backdrop-blur-md border border-gray-300 dark:border-gray-700 dark:bg-white/10 p-6 rounded-2xl shadow-xl w-full max-w-xl text-left">
            <h2 className="text-3xl font-semibold mb-3 text-green-700 dark:text-green-400">
              {food.name}
            </h2>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              <strong>Recipe:</strong> {food.recipe}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestedFood;
