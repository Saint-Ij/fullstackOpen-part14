import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { generateToken } from "../actions/users";

const Me = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">My Profile</h1>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Username:</span> {user.username}
          </p>
        </div>

        <div className="my-6 border-t" />

        <h2 className="mb-3 text-xl font-semibold">API Token</h2>

        {user.token ? (
          <div className="mb-4 rounded-lg bg-slate-100 p-3">
            <p className="break-all font-mono text-sm">{user.token}</p>
          </div>
        ) : (
          <p className="mb-4 text-gray-500">No token generated yet.</p>
        )}

        <form action={generateToken}>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Generate New Token
          </button>
        </form>
      </div>
    </div>
  );
};

export default Me;
