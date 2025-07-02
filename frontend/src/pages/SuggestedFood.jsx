import React, { useState } from "react";
import axios from "axios";

const SuggestedFood = () => {
  const [food, setFood] = useState(null);

  const getFood = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/food/random");
      setFood(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome! What do you want to eat today?</h1>
      <button onClick={getFood} className="bg-green-500 text-white px-4 py-2 rounded">
        Get Suggested Food
      </button>
      {food && (
        <div className="mt-4 border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{food.name}</h2>
          <p><strong>Recipe:</strong> {food.recipe}</p>
        </div>
      )}
    </div>
  );
};

export default SuggestedFood;
