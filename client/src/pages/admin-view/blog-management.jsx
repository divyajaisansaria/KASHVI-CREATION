"use client";

import { useState, useEffect } from "react";
import BlogForm from "../../components/admin-view/BlogForm";
import Sidebar from "@/components/admin-view/sidebar"; // ✅ Correct Sidebar Import

const BlogManagement = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched blogs:", data); // Debugging
        setPosts(data); // Ensure data is an array
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Full Height and Fixed */}
      <div className="w-64 h-screen fixed top-0 left-0 bg-[#f8f4f0] border-r border-gray-300">
        <Sidebar />
      </div>

      {/* Main Content - Pushes Sidebar and Allows Scrolling */}
      <main className="flex-grow p-6 ml-64 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Blog Management</h1>
          <BlogForm />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Published Posts</h2>
          <div className="grid gap-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-500">{post.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No blog posts available.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogManagement;
