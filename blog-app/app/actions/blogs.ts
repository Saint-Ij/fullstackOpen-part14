"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { addBlog } from "../services/blogs";
import { addLikes } from "../services/blogs";

export const createNewBlog = async (
  prevState: { error: string },
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const title = formData.get("title") as string;
  if (!title || title.length < 5) {
    return { error: "title required and must be 5 chars long" };
  }
  const author = formData.get("author") as string;
  if (!author || author.length < 5) {
    return { error: "author required and must be 5 chars long" };
  }
  const url = formData.get("url") as string;
  if (!url || url.length < 5) {
    return { error: "url required and must be 5 chars long" };
  }

  await addBlog(title, author, url);
  revalidatePath("/blogs");
  redirect("/blogs");
};

export const addBlogLikes = async (formData: FormData) => {
  const id = formData.get("id") as string;

  await addLikes(Number(id));
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
