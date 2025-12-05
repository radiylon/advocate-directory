import { count, ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

function buildSearchWhereClause(search: string) {
  return or(
    ilike(advocates.firstName, `%${search}%`),
    ilike(advocates.lastName, `%${search}%`),
    ilike(advocates.city, `%${search}%`),
    ilike(advocates.degree, `%${search}%`),
    sql`${advocates.specialties}::text ILIKE ${"%" + search + "%"}`,
    sql`${advocates.yearsOfExperience}::text ILIKE ${"%" + search + "%"}`
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.max(1, parseInt(searchParams.get("limit") || "20"));
  const offset = (page - 1) * limit;

  const whereClause = search ? buildSearchWhereClause(search) : undefined;

  // Build data query
  const baseDataQuery = db.select().from(advocates);
  const dataQuery = whereClause
    ? baseDataQuery.where(whereClause).limit(limit).offset(offset)
    : baseDataQuery.limit(limit).offset(offset);

  // Build count query
  const baseCountQuery = db.select({ count: count() }).from(advocates);
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
}
