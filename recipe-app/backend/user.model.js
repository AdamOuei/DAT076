const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScehma = new Schema(
    {
        id: Number,
        email: String,
        password: String,
        name: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserScehma);