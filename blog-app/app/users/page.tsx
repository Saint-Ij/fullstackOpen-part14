import { getUsers } from "../services/users";
import Link from "next/link";

const Users = async () => {
  const users = await getUsers();

  return (
    <div className="mx-auto max-w-md p-6">
      <h2 className="mb-4 text-xl font-semibold">Users</h2>

      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="rounded border p-3 hover:bg-gray-50 transition"
          >
            <Link
              href={`/users/${user.username}`}
              className="font-medium hover:text-blue-600"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
