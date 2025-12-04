import { ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  // Get the search parameter from the URL
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();

  // If no search parameter, return all advocates
  if (!search) {
    const data = await db.select().from(advocates);
    return Response.json({ data });
  }

  // Create a pattern to search for the search parameter
  const pattern = `%${search}%`;

  // Search for the pattern in the database, case insensitive
  // Example: if user searches for "john", it will search for "John", "john", "JOHN", etc.
  const data = await db
    .select()
    .from(advocates)
    .where(
      or(
        ilike(advocates.firstName, pattern),
        ilike(advocates.lastName, pattern),
        ilike(advocates.city, pattern),
        ilike(advocates.degree, pattern),
        sql`${advocates.specialties}::text ILIKE ${pattern}`,
        sql`${advocates.yearsOfExperience}::text ILIKE ${pattern}`
      )
    );

  return Response.json({ data });
}
