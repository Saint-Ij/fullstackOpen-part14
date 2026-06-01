"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { addBlog } from "../services/blogs";
import { addLikes } from "../services/blogs";

type FormError = {
  title?: string;
  author?: string;
  url?: string;
};
export type FormState = {
  errors: FormError;
  values: { title: string; url: string; author: string };
  success: boolean;
};

export const createNewBlog = async (
  prevState: {
    errors: FormError;
    values: { author: string; title: string; url: string };
    success: boolean;
  },
  formData: FormData
): Promise<FormState> => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors: FormError = {};

  if (!title || title.length < 5) {
    errors.title = "title required and must be 5 chars long";
  }

  if (!author || author.length < 5) {
    errors.author = "author required and must be 5 chars long";
  }

  if (!url || url.length < 5) {
    errors.url = "url required and must be 5 chars long";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false };
  }

  await addBlog(title, author, url);
  revalidatePath("/blogs");
  return { errors, values: { title, author, url }, success: true };
};

export const addBlogLikes = async (formData: FormData) => {
  const id = formData.get("id") as string;

  await addLikes(Number(id));
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
