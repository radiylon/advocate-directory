import db from "@/db";
import { advocatesSchema } from "@/db/schema";
import { createAdvocatesData } from "@/db/seed/advocates";

const DEFAULT_COUNT = 100_000;
const BATCH_SIZE = 500;

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const paramsCount = searchParams.get("count");
  const count = paramsCount ? parseInt(paramsCount) : DEFAULT_COUNT;
  const clear = searchParams.get("clear") === "true";

  console.log(`Seeding ${count} advocates...`);

  // Clear existing data if requested
  if (clear) {
    await db.delete(advocatesSchema);
    console.log("Cleared existing data.");
  }

  let totalInserted = 0;

  for (let i = 0; i < count; i += BATCH_SIZE) {
    const currentBatchSize = Math.min(BATCH_SIZE, count - i);
    const batch = createAdvocatesData(currentBatchSize);

    // Use transaction for better SQLite performance
    await db.transaction(async (tx) => {
      await tx.insert(advocatesSchema).values(batch);
    });

    totalInserted += batch.length;
  }

  console.log(`Seeding complete.`);

  return Response.json({
    message: `Successfully inserted ${totalInserted} advocates`,
    count: totalInserted,
  });
}
