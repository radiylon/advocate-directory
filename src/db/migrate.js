const { drizzle } = require("drizzle-orm/libsql");
const { migrate } = require("drizzle-orm/libsql/migrator");
const { createClient } = require("@libsql/client");

const runMigration = async () => {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const client = createClient({ url: process.env.DATABASE_URL });
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "drizzle" });
  client.close();
};

runMigration()
  .then(() => {
    console.log("Successfully ran migration.");

    process.exit(0);
  })
  .catch((e) => {
    console.error("Failed to run migration.");
    console.error(e);

    process.exit(1);
  });
