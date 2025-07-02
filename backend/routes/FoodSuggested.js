const express = require("express");
const router = express.Router();
const { getRandomFood, createFood } = require("../controllers/FoodController");

router.get("/random", getRandomFood);
router.post("/add", createFood); // This is what your dad would’ve made 😄

module.exports = router;
