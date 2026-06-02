"use client";

import Link from "next/link";
import "../globals.css";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between p-4 bg-mist-600 text-white">
      <div className="flex gap-4 m-2">
        <Link href="/" className="hover:scale-120 transition-all">
          Home
        </Link>
        <Link href="/blogs" className="hover:scale-120 transition-all">
          Blogs
        </Link>
        <Link href="/users" className="hover:scale-120 transition-all">
          Users
        </Link>
      </div>

      {session ? (
        <div className="flex gap-4 m-2">
          <Link href="/blogs/new" className="hover:scale-120 transition-all">
            Create Blog
          </Link>
          <em>{session.user?.name} logged in</em>{" "}
          <button
            onClick={() => signOut()}
            className="hover:scale-120 transition-all"
          >
            logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4 m-2">
          <Link href="/login" className="hover:scale-120 transition-all">
            login
          </Link>
          <Link href="/register" className="hover:scale-120 transition-all">
            register
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
