const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content:String,
  excerpt: String,
  image: String,
  author: String,
  category: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", blogSchema);
