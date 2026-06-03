import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/app/db";
import { users } from "@/app/db/schema";

export const POST = async (req: NextRequest) => {
  const { username, name, password } = await req.json();

  if (!username || !name || !password) {
    return NextResponse.json(
      { message: "fields must be provided" },
      { status: 400 }
    );
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({ username, name, passwordHash });
  return NextResponse.json({
    status: 201,
  });
};
