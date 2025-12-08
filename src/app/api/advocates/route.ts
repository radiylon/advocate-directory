import { asc, count, ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocatesSchema } from "../../../db/schema";

function buildSearchWhereClause(search: string) {
  return or(
    // Search firstName, lastName, city, state, degree (case-insensitive)
    ilike(advocatesSchema.firstName, `%${search}%`),
    ilike(advocatesSchema.lastName, `%${search}%`),
    ilike(advocatesSchema.city, `%${search}%`),
    ilike(advocatesSchema.state, `%${search}%`),
    ilike(advocatesSchema.degree, `%${search}%`),
    // Search in specialties array (cast to text for pattern matching)
    sql`${advocatesSchema.specialties}::text ILIKE ${"%" + search + "%"}`,
    // Search in years of experience (cast to text for pattern matching)
    sql`${advocatesSchema.yearsOfExperience}::text ILIKE ${"%" + search + "%"}`,
    // Search in full name (first + last name concatenated)
    sql`(${advocatesSchema.firstName} || ' ' || ${advocatesSchema.lastName}) ILIKE ${"%" + search + "%"}`
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "20"));
    const offset = (page - 1) * limit;

    const whereClause = search ? buildSearchWhereClause(search) : undefined;

    // Build data query with default sort by lastName A-Z
    const baseDataQuery = db
      .select()
      .from(advocatesSchema)
      .orderBy(asc(advocatesSchema.lastName));
    const dataQuery = whereClause
      ? baseDataQuery.where(whereClause).limit(limit).offset(offset)
      : baseDataQuery.limit(limit).offset(offset);

    // Build count query
    const baseCountQuery = db.select({ count: count() }).from(advocatesSchema);
    const countQuery = whereClause ? baseCountQuery.where(whereClause) : baseCountQuery;

    // Get paginated data and total count in parallel
    const [data, countResult] = await Promise.all([dataQuery, countQuery]);

    const totalCount = countResult[0].count;
    const totalPages = Math.ceil(totalCount / limit);

    return Response.json({
      data,
      pagination: {
        page,
        limit,
        totalPages,
        totalCount,
      },
    });
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return Response.json(
      { error: "Failed to fetch advocates" },
      { status: 500 }
    );
  }
}
