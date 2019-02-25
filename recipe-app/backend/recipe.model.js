const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecipeScehma = new Schema({
    id: Number,
    title: String,
    ingredients: String,
    instructions: String,
    category: [{
        String
    }]
});

module.exports = mongoose.model('Recipe', RecipeScehma);