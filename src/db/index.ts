import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const client = createClient({ url: process.env.DATABASE_URL });
const db = drizzle(client);

export default db;
