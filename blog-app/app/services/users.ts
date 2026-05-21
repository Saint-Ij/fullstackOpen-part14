import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../db";

export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getUserWithNotes = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};
