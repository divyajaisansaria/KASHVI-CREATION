"use client"

import { motion } from "framer-motion"
import { Calendar, User, Tag, ChevronRight } from "lucide-react"
import featuredImage from "../../components/images/19491-2.png"; // Importing the image directly
import Footer from '../../components/common/Footer';
import Head from "../../components/shopping-view/header";
import WhatsAppButton from "../../components/common/WhatsAppButton";
export default function Blog() {
  const featuredPost = {
    title: "The Art of Draping: Modern Styles for Traditional Sarees",
    excerpt:
      "Discover innovative ways to style your traditional sarees for a contemporary look while maintaining their cultural essence.",
    image: featuredImage, // Using the imported image
    date: "December 25, 2023",
    author: "Priya Sharma",
    category: "Styling Tips",
  }

  const posts = [
    {
      id: 1,
      title: "Understanding Different Saree Fabrics",
      excerpt: "A comprehensive guide to various saree fabrics and their characteristics.",
      image: featuredImage, // Using the imported image
      date: "December 20, 2023",
      author: "Anjali Patel",
      category: "Education",
    },
    {
      id: 2,
      title: "Regional Saree Traditions of India",
      excerpt: "Exploring the unique saree traditions from different regions of India.",
      image: featuredImage, // Using the imported image
      date: "December 18, 2023",
      author: "Meera Reddy",
      category: "Culture",
    },
    {
      id: 3,
      title: "Celebrity Saree Looks: Get Inspired",
      excerpt: "Take inspiration from the latest celebrity saree styles and trends.",
      image: featuredImage, // Using the imported image
      date: "December 15, 2023",
      author: "Riya Kumar",
      category: "Fashion",
    },
  ]

  const categories = ["All Posts", "Styling Tips", "Traditional", "Modern", "Culture", "Fashion", "Care Guide"]

  return (
    <div> <Head/>
    <div className="min-h-screen bg-[#f8f4f0] py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
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
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow text-sm"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative rounded-2xl overflow-hidden mb-16 group cursor-pointer"
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            width={1200}
            height={600}
            className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 z-20 flex items-end p-8 text-white">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="bg-purple-600 px-3 py-1 rounded-full">Featured</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {featuredPost.author}
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
              <p className="mb-6">{featuredPost.excerpt}</p>
              <button className="flex items-center gap-2 text-sm font-medium hover:underline">
                Read More <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img src={post.image} alt={post.title} className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-purple-600" />
                    <span>{post.author}</span>
                  </div>
                  <button className="text-purple-600 flex items-center gap-1 text-sm font-medium hover:text-purple-700">
                    Read More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-purple-100 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Subscribe to Our Blog</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest articles and style tips delivered straight to your inbox
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
      <WhatsAppButton/>
      <Footer />
    </div>
    </div>
  )
}
