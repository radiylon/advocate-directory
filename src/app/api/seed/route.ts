import db from "../../../db";
import { advocatesSchema } from "../../../db/schema";
import { createAdvocatesData } from "../../../db/seed/advocates";

const DEFAULT_COUNT = 100_000;

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const paramsCount = searchParams.get("count");
  const count = paramsCount ? parseInt(paramsCount) : DEFAULT_COUNT;
  
  // Batch inserts to avoid memory issues and timeouts
  const batchSize = 1000;
  let totalInserted = 0;

  console.log(`Seeding ${count} advocates...`);
  
  for (let i = 0; i < count; i += batchSize) {
    const currentBatchSize = Math.min(batchSize, count - i);
    const batch = createAdvocatesData(currentBatchSize);
    await db.insert(advocatesSchema).values(batch);
    totalInserted += batch.length;
  }

  console.log(`Seeding complete.`);

  return Response.json({ 
    message: `Successfully inserted ${totalInserted} advocates`,
    count: totalInserted 
  });
}
