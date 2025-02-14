import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/blogs/${id}`).then((res) => setBlog(res.data));
    }
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover my-6" />
      <p>{blog.excerpt}</p>
      <p className="mt-4 text-sm text-muted-foreground">By {blog.author}</p>
    </div>
  );
}
