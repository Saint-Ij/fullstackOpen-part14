import { getBlogs } from "../services/blogs";
import Link from "next/link";
const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const blogs = await getBlogs();
  const { filter } = await searchParams;
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  const filteredBlogs = filter
    ? sortedBlogs.filter((blog) => blog.title.includes(filter))
    : sortedBlogs;

  return (
    <>
      <form action={"/blogs"}>
        Search : <input type="text" name="filter" />
        <button type="submit">Search</button>
      </form>
      {filteredBlogs.map((blog) => (
        <div
          key={blog.id}
          style={{ border: "1px solid black", margin: "5px", padding: "10px" }}
        >
          <Link href={`blogs/${blog.id}`}>
            <p>Title: {blog.title}</p>
          </Link>
          <p>author: {blog.author}</p>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes}</p>
        </div>
      ))}
    </>
  );
};

export default Blogs;
