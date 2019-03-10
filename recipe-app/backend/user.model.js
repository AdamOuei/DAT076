//import Recipe from './recipe.model.js';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var  Recipe = mongoose.model('Recipe', recipe.model.js);

const UserScehma = new Schema(
    {
        id: Number,
        email: String,
        password: String,
        name: String,
        saved: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        created: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserScehma);