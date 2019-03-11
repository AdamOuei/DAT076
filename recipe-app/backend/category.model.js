const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CategorySchema = new Schema(
    {
        category: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
