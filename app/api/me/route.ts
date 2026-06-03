import { NextResponse, NextRequest } from "next/server";
import { db } from "@/app/db";
import { eq } from "drizzle-orm";
import { users } from "@/app/db/schema";

export const GET = async (req: NextRequest) => {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ status: 401 });
  }
  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      username: true,
      name: true,
    },
    where: eq(users.token, token),
    with: { createdBlogs: true },
  });

  if (!user) {
    return NextResponse.json({ status: 401 });
  }
  return NextResponse.json(user);
};
