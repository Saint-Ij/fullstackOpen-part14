"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { readingList, users } from "../db/schema";
import { addToReadingList } from "../services/reading_list";
import { getCurrentUser } from "../services/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type userFormError = {
  username?: string;
  password?: string;
};

export type userFormState = {
  errors: userFormError;
  values: {
    username: string;
    password: string;
    cpassword: string;
    name: string;
  };
  success: boolean;
};

export const registerUser = async (
  prevState: {
    errors: userFormError;
    values: { username: string; password: string; cpassword: string };
    success: boolean;
  },
  formData: FormData
): Promise<userFormState> => {
  const errors: userFormError = {};

  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const cpassword = formData.get("cpassword") as string;

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  if (user) {
    errors.username = "username already exists";
  }

  if (cpassword !== password) {
    errors.password = "passwords must match";
  }

  if (username.length < 4) {
    errors["username"] = "username must be atleast 4 chars long";
  }

  if (password.length < 4) {
    errors.password = "password must be atleast 4 chars long";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, password, cpassword, name },
      success: false,
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });
  revalidatePath("/users");
  return {
    errors,
    values: { username, password, cpassword, name },
    success: true,
  };
};

export const generateToken = async () => {
  const token = crypto.randomUUID();
  const user = await getCurrentUser();
  if (!user) {
    redirect("login");
  }

  await db.update(users).set({ token }).where(eq(users.id, user.id));
  revalidatePath("/me");
};

export const addBlog = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const blogId = Number(formData.get("blogId"));
  const userId = user?.id;
  await addToReadingList(Number(userId), blogId);
  revalidatePath("/me");
  revalidatePath("/blogs");
};

export const markRead = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const blogId = Number(formData.get("blogId"));
  await db.update(readingList).set({read: true}).where(eq(readingList.id, blogId))
};
