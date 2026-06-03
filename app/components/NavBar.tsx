"use client";

import Link from "next/link";
import "../globals.css";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav
      role="navigation"
      className="flex justify-between p-4 bg-mist-600 text-white"
    >
      <div className="flex gap-4 m-2">
        <Link href="/">Home</Link>
        <Link href="/blogs">blogs</Link>
        <Link href="/users">users</Link>
      </div>

      {session ? (
        <div className="flex gap-4 m-2 items-center">
          <Link href="/blogs/new">Create Blog</Link>
          <Link href="/me">me</Link>

          <button onClick={() => signOut()} type="button">
            logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4 m-2">
          <Link href="/login">login</Link>
          <Link href="/register">register</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
