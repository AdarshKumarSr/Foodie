const Food = require("../models/suggestedFood.model");

// Get random food
exports.getRandomFood = async (req, res) => {
  try {
    const count = await Food.countDocuments();
    const random = Math.floor(Math.random() * count);
    const food = await Food.findOne().skip(random);
    res.json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new food item
exports.createFood = async (req, res) => {
  try {
    const { name, recipe } = req.body;
    const newFood = new Food({ name, recipe });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
