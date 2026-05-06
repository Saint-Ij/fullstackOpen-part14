import { getBlogs } from "../services/blogs";
const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const blogs = getBlogs();
  const { filter } = await searchParams;
  const SortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  const filteredBlogs = filter
    ? SortedBlogs.filter((blog) => blog.title.includes(filter))
    : SortedBlogs;

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
          <p>Title: {blog.title}</p>
          <p>author: {blog.author}</p>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes}</p>
        </div>
      ))}
    </>
  );
};

export default Blogs;
