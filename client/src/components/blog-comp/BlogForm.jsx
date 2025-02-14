import { useState, useEffect } from "react";
import axios from "axios";

export default function BlogForm({ blog, closeForm }) {
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blog?._id) {
        // Update existing blog
        await axios.put(`http://localhost:5000/api/blogs/${blog._id}`, { title, content });
      } else {
        // Create new blog
        await axios.post("http://localhost:5000/api/blogs", { title, content });
      }
      closeForm(true); // Refresh list after submitting
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{blog ? "Edit Blog" : "Add New Blog"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            rows="4"
            required
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              {blog ? "Update" : "Add"}
            </button>
            <button type="button" onClick={() => closeForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
