"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const BlogList = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog/posts")
      const data = await response.json()
      setPosts(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching posts:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post._id} to={`/blog/${post.slug}`} className="group relative overflow-hidden rounded-lg">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h2 className="text-white text-xl font-semibold">{post.title}</h2>
              <p className="text-white/80 text-sm mt-2">{post.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogList

