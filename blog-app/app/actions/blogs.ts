"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog } from "../services/blogs";
import { addLikes } from "../services/blogs";

export const createNewBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  addBlog(title, author, url);
  revalidatePath("/blogs");
  redirect("/blogs");
};

export const addBlogLikes = async (formData: FormData) => {
  const id = formData.get("id") as string;

  addLikes(Number(id));
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
