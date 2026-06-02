import { blogs } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "./session";

export const getBlogs = async () => {
  return db.query.blogs.findMany();
};

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("No user found");
  }
  const result = await db
    .insert(blogs)
    .values({ title, author, url, userId: user?.id })
    .returning({
      id: blogs.id,
    });
  return { userId: user.id, blogId: result[0].id };
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
