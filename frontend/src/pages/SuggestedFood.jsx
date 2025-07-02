import React, { useState } from "react";
import axios from "axios";

const SuggestedFood = () => {
  const [food, setFood] = useState(null);

  const getFood = async () => {
    try {
       console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

      const res = await axios.get(
       `${process.env.REACT_APP_API_BASE_UR}/api/food/random`
      );

      setFood(res.data);
    } catch (err) {
      console.error("Error fetching food:", err);
    }
  };

  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        Welcome! What do you want to eat today?
      </h1>
      <button
        onClick={getFood}
        className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-lg shadow"
      >
        Get Suggested Food
      </button>
      {food && (
        <div className="mt-6 bg-white border p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">{food.name}</h2>
          <p className="text-gray-700">
            <strong>Recipe:</strong> {food.recipe}
          </p>
        </div>
      )}
    </div>
  );
};

export default SuggestedFood;
