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
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);
  
  return (
    <form style={formStyles} action={formAction}>
      <label>
        Title:{" "}
        <input type="text" name="title" defaultValue={state.values.title} />
      </label>
      {state.errors.title && (
        <p style={{ color: "red" }}>{state.errors.title}</p>
      )}
      <label>
        Author:{" "}
        <input type="text" name="author" defaultValue={state.values.author} />
      </label>
      {state.errors.author && (
        <p style={{ color: "red" }}>{state.errors.author}</p>
      )}
      <label>
        Url: <input type="text" name="url" defaultValue={state.values.url} />
      </label>
      {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
      <button type="submit" style={buttonStyle}>
        Submit
      </button>
    </form>
  );
};

const formStyles: React.CSSProperties = {
  margin: "5px",
  display: "flex",
  gap: "7px",
  flexDirection: "column",
};

const buttonStyle: React.CSSProperties = {
  width: "100px",
};

export default NewBlog;
