import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { generateToken } from "../actions/users";
import { getReadingList } from "../services/users";
import { markRead } from "../actions/users";

type Blog = {
  id: number;
  title: string;
};

const Me = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const readingList = await getReadingList(user.id);

  const readBlogs: Blog[] = [];
  const unreadBlogs: Blog[] = [];

  readingList?.readings.forEach((reading) => {
    if (reading.read) readBlogs.push({id: reading.id, title: reading.blog.title});
    else unreadBlogs.push({ id: reading.id, title: reading.blog.title });
  });

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-8 rounded-xl border bg-white p-6 shadow-sm">
        {/* Profile */}
        <div>
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>

          <div className="space-y-1 text-gray-700">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Username:</span> {user.username}
            </p>
          </div>
        </div>

        <div className="border-t" />

        {/* Reading List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Reading List</h2>

          {/* Unread */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Unread ({unreadBlogs.length})
            </p>

            <div className="space-y-2">
              {unreadBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{blog.title}</p>
                  </div>

                  <form action={markRead}>
                    <input type="hidden" name="blogId" value={blog.id} />
                    <button
                      type="submit"
                      className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                    >
                      Mark as read
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>

          {/* Read */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Read ({readBlogs.length})
            </p>

            <div className="space-y-2">
              {readBlogs.map((blog) => (
                <div key={blog.id} className="rounded-lg border p-3 bg-gray-50">
                  <p className="font-medium">{blog.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t" />

        {/* Token */}
        <div>
          <h2 className="text-xl font-semibold mb-3">API Token</h2>

          {user.token ? (
            <div className="rounded-lg bg-gray-100 p-3">
              <p className="break-all font-mono text-sm">{user.token}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No token generated yet.</p>
          )}

          <form action={generateToken} className="mt-3">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Generate New Token
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Me;
