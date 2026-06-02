"use client";

import { createNewBlog, FormState } from "@/app/actions/blogs";
import { useActionState, useEffect } from "react";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";

const NewBlog = () => {
  const initialState: FormState = {
    errors: {},
    values: {
      title: "",
      author: "",
      url: "",
    },
    success: false,
  };

  const router = useRouter();
  const { showNotification } = useNotification();

  const [state, formAction] = useActionState(createNewBlog, initialState);

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        action={formAction}
        className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h2 className="text-xl font-semibold">New Blog</h2>

        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={state.values.title}
            className="w-full rounded border p-2 focus:border-blue-500 outline-none"
          />
          {state.errors.title && (
            <p className="mt-1 text-sm text-red-600">{state.errors.title}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="author"
            placeholder="Author"
            defaultValue={state.values.author}
            className="w-full rounded border p-2 focus:border-blue-500 outline-none"
          />
          {state.errors.author && (
            <p className="mt-1 text-sm text-red-600">{state.errors.author}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="url"
            placeholder="URL"
            defaultValue={state.values.url}
            className="w-full rounded border p-2 focus:border-blue-500 outline-none"
          />
          {state.errors.url && (
            <p className="mt-1 text-sm text-red-600">{state.errors.url}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
