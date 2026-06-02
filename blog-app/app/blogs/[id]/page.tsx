import { addBlogLikes } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";
import { demoBlogs } from "../page";

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let blog;
  try {
    blog = await getBlogById(Number(id));
  } catch {
    blog = demoBlogs.find((blog) => blog.id === id);
  }

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3 h-75">
      <p className="text-3xl font-bold">{blog.title}</p>
      <p>By <span className="text-red-950 italic text-md">{blog.author}</span></p>
      <p className="cursor-pointer underline text-green-950">{blog.url}</p>
      <p>{blog.likes} likes</p>
      <form action={addBlogLikes}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="border-3 border-black rounded-lg px-4 py-1 cursor-pointer">Like</button>
      </form>
    </div>
  );
};

export default Blog;
