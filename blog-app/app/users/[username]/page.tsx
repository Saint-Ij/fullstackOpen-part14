import { getUserWithNotes } from "@/app/services/users";
import { notFound } from "next/navigation";

const User = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  const user = await getUserWithNotes(username);

  if (!user) notFound();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">@{user.username}</p>
      </div>

      <h3 className="mb-3 text-lg font-semibold">Notes</h3>

      <div className="space-y-4">
        {user.blogs.map((blog) => (
          <div
            key={blog.id}
            className="rounded border p-4 shadow-sm hover:bg-gray-50 transition"
          >
            <p className="font-semibold">{blog.title}</p>
            <p className="text-sm text-gray-600">Author: {blog.author}</p>
            <p className="text-sm text-gray-600">URL: {blog.url}</p>
            <p className="text-sm text-gray-600">Likes: {blog.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
