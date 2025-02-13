const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    
    // Validate the keyword input
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format",
      });
    }

    // Create a regex for case-insensitive search
    const regEx = new RegExp(keyword, "i");

    // Build search query
    const createSearchQuery = {
      $or: [
        { designNumber: regEx },
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { occasion: regEx },
        { fabric: regEx }, // Using fabric instead of brand, as it exists in the schema
        { color: regEx }, 
      ],
    };

    // Search the products in the database
    const searchResults = await Product.find(createSearchQuery);

    // If no results are found
    if (searchResults.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found for the provided keyword",
      });
    }

    // Return search results
    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while searching products",
    });
  }
};

module.exports = { searchProducts };
