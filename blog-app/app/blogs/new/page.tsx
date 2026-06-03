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
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={state.values.title}
            className="w-full rounded border p-2 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="author" className="mb-1 block text-sm font-medium">
            Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            defaultValue={state.values.author}
            className="w-full rounded border p-2 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="url" className="mb-1 block text-sm font-medium">
            URL
          </label>
          <input
            id="url"
            type="text"
            name="url"
            defaultValue={state.values.url}
            className="w-full rounded border p-2 focus:border-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          data-testid="create-blog-button"
          className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
