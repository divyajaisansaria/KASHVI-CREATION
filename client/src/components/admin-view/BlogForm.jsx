"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    category: "",
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    const token = localStorage.getItem("token"); // Get token from localStorage

    const response = await fetch("http://localhost:5000/api/admin/blog", {
      method: "POST",
      body: formDataToSend,
      headers: {
        Authorization: `Bearer ${token}`, // Send token in headers
      },
    });

    if (response.ok) {
      toast.success("Blog post created successfully!");
      setFormData({ title: "", content: "", image: null, category: "" });
    } else {
      toast.error("Failed to create blog post");
    }
  } catch (error) {
    toast.error("Error creating blog post");
  }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="trends">Saree Trends</option>
            <option value="styling">Styling Tips</option>
            <option value="festivals">Festival Fashion</option>
            <option value="collections">Collections</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Featured Image</label>
          <input type="file" name="image" onChange={handleChange} accept="image/*" className="w-full" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90">
          Publish Post
        </button>
      </form>
    </div>
  )
}

export default BlogForm

