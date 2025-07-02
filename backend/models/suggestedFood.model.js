// suggestedFood.model.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: String,
  recipe: String
});

module.exports = mongoose.model('Food', foodSchema);
