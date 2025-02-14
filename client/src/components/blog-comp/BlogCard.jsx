import { Calendar, User, Tag, ChevronRight } from "lucide-react";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {blog.date}
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            {blog.category}
          </div>
        </div>
        <div className="flex flex-col justify-center flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-center">{blog.title}</h3>
        </div>
        <p className="text-muted-foreground mb-4">{blog.excerpt}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-purple-600" />
            <span>{blog.author}</span>
          </div>
          <a
            href={`/More/blog/${blog._id}`}
            className="text-purple-600 flex items-center gap-1 text-sm font-medium hover:text-purple-700"
          >
            Read More <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
