import { relations } from "drizzle-orm";
import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  important: boolean("important").notNull().default(false),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}));

export const notesRelations = relations(notes, ({ one }) => ({
  users: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
}));
