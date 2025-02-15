import { Link } from "react-router-dom"

const BlogCard = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="group relative overflow-hidden rounded-lg">
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
  )
}

export default BlogCard

