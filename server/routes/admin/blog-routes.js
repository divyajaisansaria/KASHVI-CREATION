const express = require("express")
const router = express.Router()
const multer = require("multer")
const { isAdmin } = require("../../middleware/auth")
const { createBlog, getAllBlogs, updateBlog, deleteBlog } = require("../../controllers/admin/blog-controller")

const upload = multer({ storage: multer.memoryStorage() })

router.post("/blog", isAdmin, upload.single("image"), createBlog)
router.get("/blog", isAdmin, getAllBlogs)
router.put("/blog/:id", isAdmin, upload.single("image"), updateBlog)
router.delete("/blog/:id", isAdmin, deleteBlog)

module.exports = router

