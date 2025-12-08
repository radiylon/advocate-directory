import { InferSelectModel, sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

const advocatesSchema = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  degree: text("degree").notNull(),
  specialties: jsonb("specialties").$type<string[]>().default([]).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  stateIdx: index("advocates_state_idx").on(table.state),
  lastNameIdx: index("advocates_last_name_idx").on(table.lastName),
}));

export type Advocate = InferSelectModel<typeof advocatesSchema>;

export { advocatesSchema };
