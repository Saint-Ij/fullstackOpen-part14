import { getBlogs } from "../services/blogs";
import Link from "next/link";

export const demoBlogs = [
  {
    id: "1",
    title: "Getting started with Next.js",
    author: "Admin",
    url: "https://example.com/nextjs",
    likes: 12,
  },
  {
    id: "2",
    title: "Understanding React Server Components",
    author: "Dev User",
    url: "https://example.com/rsc",
    likes: 25,
  },
  {
    id: "3",
    title: "Building APIs in Node.js",
    author: "Backend Dev",
    url: "https://example.com/node",
    likes: 8,
  },
];
const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  let blogs;
  try {
    blogs = await getBlogs();
  } catch {
    blogs = demoBlogs;
  }
  const { filter } = await searchParams;
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  const filteredBlogs = filter
    ? sortedBlogs.filter((blog) => blog.title.includes(filter))
    : sortedBlogs;

  return (
    <div className="m-3">
      <form action={"/blogs"} className="m-2 p-2">
        <span className="text-2xl font-bold">Search: </span>{" "}
        <input type="text" name="filter" className="border-2 rounded-sm p-1" />
        <button type="submit" className="bg-blue-500 rounded p-2 ml-4 m-2">
          Search
        </button>
      </form>
      <div className=" grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      {filteredBlogs.map((blog) => (
        <div
          key={blog.id}
          className="border-slate-800 rounded-2xl border-2 p-3"
        >
          <Link href={`blogs/${blog.id}`}>
            <p className="text-blue-400 hover:scale-101 transition-all font-semibold">Title: {blog.title}</p>
          </Link>
          <p>author: {blog.author}</p>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Blogs;
