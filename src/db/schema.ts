import { InferSelectModel, sql } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  index,
} from "drizzle-orm/sqlite-core";

const advocatesSchema = sqliteTable("advocates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  degree: text("degree").notNull(),
  specialties: text("specialties", { mode: "json" }).$type<string[]>().default([]).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
}, (table) => ({
  stateIdx: index("advocates_state_idx").on(table.state),
  lastNameIdx: index("advocates_last_name_idx").on(table.lastName),
}));

export type Advocate = InferSelectModel<typeof advocatesSchema>;

export { advocatesSchema };
