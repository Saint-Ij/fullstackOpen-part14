const blogs = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    author: "Ahmed Lawal",
    url: "https://example.com/js-closures",
    likes: 120,
  },
  {
    id: 2,
    title: "A Guide to Modern CSS Layouts",
    author: "Fatima Bello",
    url: "https://example.com/css-layouts",
    likes: 95,
  },
  {
    id: 3,
    title: "Getting Started with Node.js",
    author: "Ibrahim Aminu",
    url: "https://example.com/nodejs-guide",
    likes: 150,
  },
];

export const getBlogs = () => {
  return blogs;
};

export const addBlog = (title: string, author: string, url: string) => {
  let lastId = blogs[blogs.length - 1].id;
  const id: number = ++lastId;
  blogs.push({ id, author, url, title, likes: 0 });
};

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id);
};

export const addLikes = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id);
  if (blog) ++blog.likes;
};
