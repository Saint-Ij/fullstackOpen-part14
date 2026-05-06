import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/blogs">Blogs</Link>
        {" | "}
        <Link href="/blogs/new">Create Blog</Link>
        {children}
      </body>
    </html>
  );
}
