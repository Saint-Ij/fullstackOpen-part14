"use client";

import { createNewBlog } from "@/app/actions/blogs";
import { useActionState } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createNewBlog, { error: "" });
  return (
    <form style={formStyles} action={formAction}>
      <label>
        Title: <input type="text" name="title" />
      </label>
      <label>
        Author: <input type="text" name="author" />
      </label>
      <label>
        Url: <input type="text" name="url" />
      </label>
      <button type="submit" style={buttonStyle}>
        Submit
      </button>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
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
