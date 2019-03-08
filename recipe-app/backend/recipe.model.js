const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
  label: String,
  value: Number
});

let RecipeSchema = new Schema(
  {
    id: Number,
    title: String,
    ingredients: String,
    instructions: String,
    category: [CategorySchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
