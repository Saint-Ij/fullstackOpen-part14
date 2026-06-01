"use client";

import { registerUser, userFormState } from "../actions/users";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/NotificationContext";

export default function RegisterPage() {
  const router = useRouter();
  const { showNotification } = useNotification();

  const initialState: userFormState = {
    errors: {},
    values: {
      username: "",
      password: "",
      cpassword: "",
      name: "",
    },
    success: false,
  };
  const [state, formAction] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state.success) {
      showNotification("user created");
      router.push("/users");
    }
  }, [state, showNotification, router]);
  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              defaultValue={state.values.username}
            />
          </label>
          {state.errors.username && (
            <p style={{ color: "red" }}>{state.errors.username}</p>
          )}
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              defaultValue={state.values.name}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              defaultValue={state.values.password}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="cpassword"
              required
              defaultValue={state.values.cpassword}
            />
          </label>
          {state.errors.password && (
            <p style={{ color: "red" }}>{state.errors.password}</p>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
