import { addBlogLikes } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import { demoBlogs } from "../page";

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let blog;

  try {
    blog = await getBlogById(Number(id));
  } catch {
    blog = demoBlogs.find((b) => b.id === id);
  }

  if (!blog) notFound();

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-xl border bg-white p-6 shadow-sm text-center space-y-4">
        <h1 className="text-2xl font-bold">{blog.title}</h1>

        <p className="text-sm text-gray-600">
          By <span className="font-medium text-gray-900">{blog.author}</span>
        </p>

        <Link href={``}
          className="text-blue-600 underline break-all hover:text-blue-800"
        >
          {blog.url}
        </Link>

        <p className="text-sm font-medium text-gray-700">{blog.likes} likes</p>

        <form action={addBlogLikes}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
          >
            Like
          </button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
