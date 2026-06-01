"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <>
      <Link href="/">Home</Link>
      {" | "}
      <Link href="/blogs">Blogs</Link>
      {" | "}
      <Link href="/users">Users</Link>
      {" | "}
      {session ? (
        <>
          <Link href="/blogs/new">Create Blog</Link>
          {" | "}
          <em>{session.user?.name} logged in</em>{" "}
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          {" | "}
          <Link href="/register">register</Link>
        </>
      )}
    </>
  );
};

export default NavBar;
