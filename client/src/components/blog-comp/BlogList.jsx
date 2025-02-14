import { useEffect, useState } from "react";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs") // Adjust backend URL if needed
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {blogs.map(blog => (
        <div key={blog._id} className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold">{blog.title}</h2>
          <p className="text-gray-700">{blog.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
