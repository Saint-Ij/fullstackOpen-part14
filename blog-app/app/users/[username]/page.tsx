import { getUserWithNotes } from "@/app/services/users";
import { notFound } from "next/navigation";

const User = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  const user = await getUserWithNotes(username);

  if (!user) {
    return notFound();
  }

  return (
    <>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>

      <h3>Notes</h3>
      {user.blogs.map((blog) => (
        <ul key={blog.id}>
          <li>Title: {blog.title}</li>
          <li>Author: {blog.author}</li>
          <li>url: {blog.url}</li>
          <li>likes: {blog.likes}</li>
        </ul>
      ))}
    </>
  );
};

export default User;
