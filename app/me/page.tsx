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
    const blog = {
      id: reading.blog.id,
      title: reading.blog.title,
    };

    if (reading.read) readBlogs.push(blog);
    else unreadBlogs.push(blog);
  });

  return (
    <div
      data-testid="user-profile"
      className="flex min-h-[70vh] items-center justify-center p-6"
    >
      <div className="w-full max-w-3xl space-y-8 rounded-xl border bg-white p-6 shadow-sm">
        {/* Profile */}
        <div>
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>

          <div className="space-y-1 text-gray-700">
            <p data-testid="user-name">
              <span className="font-semibold">Name:</span> {user.name}
            </p>

            <p data-testid="user-username">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
          </div>
        </div>

        <div className="border-t" />

        {/* Reading List */}
        <div data-testid="reading-list-section">
          <h2 className="text-xl font-semibold mb-4">Reading List</h2>

          {/* Unread */}
          <div className="mb-6" data-testid="unread-section">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Unread ({unreadBlogs.length})
            </p>

            {unreadBlogs.length === 0 && (
              <p
                data-testid="no-unread-blogs"
                className="text-sm text-gray-500"
              >
                No unread blogs
              </p>
            )}

            <div className="space-y-2">
              {unreadBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
                >
                  <p className="font-medium">{blog.title}</p>

                  <form action={markRead}>
                    <input type="hidden" name="blogId" value={blog.id} />

                    <button
                      type="submit"
                      data-testid={`mark-read-${blog.id}`}
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
        <div data-testid="api-token-section">
          <h2 className="text-xl font-semibold mb-3">API Token</h2>

          {user.token ? (
            <div
              data-testid="token-display"
              className="rounded-lg bg-gray-100 p-3"
            >
              <p
                data-testid="api-token"
                className="break-all font-mono text-sm"
              >
                {user.token}
              </p>
            </div>
          ) : (
            <p data-testid="no-token-message" className="text-gray-500 text-sm">
              No token generated yet.
            </p>
          )}

          <form action={generateToken} className="mt-3">
            <button
              type="submit"
              data-testid="generate-token-button"
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
