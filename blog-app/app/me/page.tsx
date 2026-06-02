import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { generateToken } from "../actions/users";

const Me = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>My Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Username: {user?.username}</p>

      <hr />

      <h1>ApI token</h1>
      {user.token && <p>Current token: {user.token}</p>}

      <button onClick={generateToken}>Generate new token</button>
    </div>
  );
};

export default Me;
