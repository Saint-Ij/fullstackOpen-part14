import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url"),
  author: text("author").notNull(),
  likes: integer("likes").notNull().default(0),
});
