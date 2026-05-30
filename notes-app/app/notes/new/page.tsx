"use client";

import { createNote } from "@/app/actions/notes";
import { useActionState } from "react";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NewNote = () => {
  const [state, formAction] = useActionState(createNote, {
    error: "",
    success: false,
  });
  const router = useRouter();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state.success) {
      showNotification("note created");
      router.push("/notes");
    }
  }, [state, showNotification, router]);
  return (
    <div>
      <h2>Create a new note</h2>
      <form action={formAction}>
        <div>
          <label>
            Content
            <input type="text" name="content" required minLength={10} />
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="important" />
            Important
          </label>
        </div>
        <button type="submit">Create</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
};

export default NewNote;
