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
    ? sortedBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase())
      )
    : sortedBlogs;

  return (
    <div className="m-4">
      <form action="/blogs" className="mb-6 flex flex-wrap items-center gap-3">
        <label htmlFor="filter" className="text-lg font-semibold">
          Search
        </label>

        <input
          id="filter"
          type="text"
          name="filter"
          defaultValue={filter}
          data-testid="filter-input"
          className="rounded border px-3 py-2 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          data-testid="search-button"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div
        data-testid="blogs-list"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <Link href={`/blogs/${blog.id}`}>
              <p className="mb-2 font-semibold text-blue-600 hover:text-blue-800">
                {blog.title}
              </p>
            </Link>

            <p className="text-sm text-gray-600">Author: {blog.author}</p>

            <p className="break-all text-sm text-gray-600">URL: {blog.url}</p>

            <p className="mt-2 text-sm font-medium text-gray-800">
              {blog.likes} likes
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
