"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  return (
    <div
      className={
        type === "success"
          ? `p-2 m-2 rounded bg-green-600 text-white`
          : `p-2 m-2 rounded bg-red-500 text-white`
      }
      data-testid="notification"
    >
      {message}
    </div>
  );
}
