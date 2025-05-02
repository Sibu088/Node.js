// models/recipe.js
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [String],
  preparationTime: Number,
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  instructions: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recipe", recipeSchema);
