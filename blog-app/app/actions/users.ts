"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

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
  return {
    errors,
    values: { username, password, cpassword, name },
    success: true,
  };
};
