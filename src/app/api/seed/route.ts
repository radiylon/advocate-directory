import db from "../../../db";
import { advocatesSchema } from "../../../db/schema";
import { createAdvocatesData } from "../../../db/seed/advocates";

export async function POST() {
  const advocateData = createAdvocatesData();
  const advocates = await db.insert(advocatesSchema).values(advocateData).returning();

  return Response.json({ advocates });
}
