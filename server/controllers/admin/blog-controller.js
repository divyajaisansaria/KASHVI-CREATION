const Blog = require("../../models/Blog")
const { uploadImage } = require("../../helpers/cloudinary")


const createBlog = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        let imageUrl = "";
    
        if (req.file) {
          const result = await imageUploadUtil(req.file.buffer.toString("base64"));
          imageUrl = result.secure_url;
        }
    
        const blog = new Blog({
          title,
          content,
          imageUrl,
          category,
          author: req.user._id,
        });
    
        await blog.save();
        res.status(201).json(blog);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating blog post" });
      }
}

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.json(blogs)
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" })
  }
}

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    if (req.file) {
      updates.imageUrl = await uploadImage(req.file)
    }

    const blog = await Blog.findByIdAndUpdate(id, updates, { new: true })
    res.json(blog)
  } catch (error) {
    res.status(500).json({ message: "Error updating blog post" })
  }
}

const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog post" })
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
}

