"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ChevronRight, X, Trash2 } from "lucide-react";
import axios from "axios";
import Footer from "../../../components/common/Footer";
import Head from "../../../components/shopping-view/header";
import WhatsAppButton from "../../../components/common/WhatsAppButton";
import BlogForm from "../../../components/blog-comp/BlogForm";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const handleUpdateBlog = async (updatedBlog) => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/${updatedBlog._id}`, {
        title: updatedBlog.title,
        content: updatedBlog.content,
        author: updatedBlog.author,
      });

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
      );
      setShowForm(false);
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      setShowForm(false);
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <div>
      <Head />
      <div className="min-h-screen bg-[#f8f4f0] pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the latest trends, styling tips, and cultural insights about sarees
            </p>
            <button
              onClick={() => {
                setEditingBlog(null);
                setShowForm(true);
              }}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add New Blog
            </button>
          </motion.div>

          {showForm && (
            <div className="relative">
              <BlogForm
                blog={editingBlog}
                closeForm={() => setShowForm(false)}
                onUpdate={handleUpdateBlog}
                onDelete={handleDeleteBlog}
              />
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={() => setShowForm(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Blog Tiles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow p-6 relative flex flex-col min-h-[250px]"
              >
                {/* Delete Button on Tile */}
                <button
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-semibold mb-2 text-center flex-1 flex items-center justify-center">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground mb-2 flex-grow break-words">
                  {blog.content}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-purple-600" />
                    <span>{blog.author}</span>
                  </div>
                  <button
                    onClick={() => {
                      setEditingBlog(blog);
                      setShowForm(true);
                    }}
                    className="text-purple-600 flex items-center gap-1 text-sm font-medium hover:text-purple-700"
                  >
                    Edit <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}
