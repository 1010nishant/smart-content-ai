import { create } from "domain";
import { pgTable, varchar, serial, text } from "drizzle-orm/pg-core";

export const AIOutput = pgTable("aiOutput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData").notNull(),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("email").notNull(),
  createdAt: varchar("createdAt"),
});
