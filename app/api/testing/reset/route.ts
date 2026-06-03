import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { blogs, readingList, users } from "@/app/db/schema";

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 }
    );
  }
  await db.delete(readingList);
  await db.delete(blogs);
  await db.delete(users);
  return NextResponse.json({
    status: 204,
  });
};
