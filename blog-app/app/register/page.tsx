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
      router.push("/users");
    }
  }, [state, showNotification, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Register</h2>

        <form action={formAction} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              defaultValue={state.values.username}
              className="w-full rounded border p-2 outline-none focus:border-blue-500"
            />
            {state.errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.username}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              defaultValue={state.values.name}
              className="w-full rounded border p-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              defaultValue={state.values.password}
              className="w-full rounded border p-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm password"
              defaultValue={state.values.cpassword}
              className="w-full rounded border p-2 outline-none focus:border-blue-500"
            />
            {state.errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
