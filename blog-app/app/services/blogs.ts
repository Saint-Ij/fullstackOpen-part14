import { blogs } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const getBlogs = async () => {
  return db.query.blogs.findMany();
};

export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({ title, author, url });
};

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const addLikes = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    const likes = blog.likes ? ++blog.likes : 1;
    await db
      .update(blogs)
      .set({
        likes: likes,
      })
      .where(eq(blogs.id, id));
  }
};
