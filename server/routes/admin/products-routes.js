const express = require("express");
const { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct } = require("../../controllers/admin/products-controller");
const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

/**
 * @route   POST /api/admin/upload-images
 * @desc    Upload multiple images to Cloudinary
 */
router.post("/upload-images", upload.array("images", 10), handleImageUpload);

/**
 * @route   POST /api/admin/add
 * @desc    Add a new product with multiple images
 */
router.post("/add", addProduct);

/**
 * @route   GET /api/admin/get
 * @desc    Fetch all products
 */
router.get("/get", fetchAllProducts);

/**
 * @route   PUT /api/admin/edit/:id
 * @desc    Edit an existing product by ID
 */
router.put("/edit/:id", editProduct);

/**
 * @route   DELETE /api/admin/delete/:id
 * @desc    Delete a product by ID
 */
router.delete("/delete/:id", deleteProduct);

module.exports = router;
