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
      showNotification("User created");
      router.push("/login");
    }
  }, [state, showNotification, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Register</h2>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              defaultValue={state.values.username}
              className="w-full rounded border p-2"
            />
            {state.errors.username && (
              <p
                data-testid="username-error"
                className="mt-1 text-sm text-red-600"
              >
                {state.errors.username}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              defaultValue={state.values.name}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              defaultValue={state.values.password}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              type="password"
              name="cpassword"
              defaultValue={state.values.cpassword}
              className="w-full rounded border p-2"
            />
            {state.errors.password && (
              <p
                data-testid="passwordConfirm-error"
                className="mt-1 text-sm text-red-600"
              >
                {state.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            data-testid="register-button"
            className="w-full rounded bg-blue-600 p-2 text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
