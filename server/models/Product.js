const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    designNumber: Number,
    title: String,
    description: String,
    category: String,
    occasion: String,
    fabric: String,
    color: String,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
