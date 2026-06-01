"use client";

import { registerUser, userFormState } from "../actions/users";
import { useActionState } from "react";

export default function RegisterPage() {
  const initialState: userFormState = {
    errors: {},
    values: {
      username: "",
      password: "",
      cpassword: "",
      name: ""
    },
  };
  const [state, formAction] = useActionState(registerUser, initialState);
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
