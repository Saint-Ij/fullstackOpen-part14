import { addBlogLikes } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import { demoBlogs } from "../page";
import { getReadingList } from "@/app/services/users";
import { addBlog } from "@/app/actions/users";
import { auth } from "@/auth";

const BlogInReadingList = async (blogId: number): Promise<boolean> => {
  const session = await auth();

  if (!session) return true;

  const userId = Number(session.user?.id);
  const readingList = await getReadingList(userId);

  return (
    readingList?.readings?.some((reading) => reading.blogId === blogId) ?? false
  );
};

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  const userId = Number(session?.user?.id);

  let blog;

  try {
    blog = await getBlogById(Number(id));
  } catch {
    blog = demoBlogs.find((b) => b.id === id);
  }

  if (!blog) notFound();

  const inList = await BlogInReadingList(Number(blog.id));

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-5 rounded-xl border bg-white p-6 shadow-sm text-center">
        <h1 className="text-2xl font-bold">{blog.title}</h1>

        <p className="text-sm text-gray-600">
          By <span className="font-semibold text-gray-900">{blog.author}</span>
        </p>

        <Link
          href={blog.url || "#"}
          target="_blank"
          className="break-all text-blue-600 underline hover:text-blue-800"
        >
          {blog.url}
        </Link>

        <p className="text-sm font-medium text-gray-700">{blog.likes} likes</p>

        <div className="flex flex-col items-center gap-3">
          {!inList && (
            <form action={addBlog.bind(null, userId, Number(blog.id))}>
              <button
                type="submit"
                className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
              >
                Add to Reading List
              </button>
            </form>
          )}

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
    </div>
  );
};

export default Blog;
