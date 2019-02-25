const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Recipe = new Schema({
    recipe_name: {
        type: String
    },
    recipe_category: {
        type: String
    }
});

module.exports = mongoose.model('Recipe', Recipe);