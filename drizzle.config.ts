import type { Config } from "drizzle-kit";

const config: Config = {
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL || "file:./local.db",
  },
  verbose: true,
  strict: true,
};

export default config;
