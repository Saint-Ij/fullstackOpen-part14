import { getUsers } from "../services/users";
import Link from "next/link";

const Users = async () => {
  const users = await getUsers();
  return (
    <>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Users;
