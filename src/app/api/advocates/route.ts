import { and, asc, desc, count, eq, or, sql, SQL } from "drizzle-orm";
import db from "@/db";
import { advocatesSchema } from "@/db/schema";
import { FilterParams, SortDirection } from "@/types";

function buildSearchWhereClause(search: string): SQL | undefined {
  const searchPattern = `%${search}%`;
  return or(
    // Search in full name (first + last name concatenated)
    sql`(${advocatesSchema.firstName} || ' ' || ${advocatesSchema.lastName}) ILIKE ${searchPattern}`,
    // Search city (case-insensitive)
    sql`${advocatesSchema.city} ILIKE ${searchPattern}`,
    // Search in specialties array (cast to text for pattern matching)
    sql`${advocatesSchema.specialties}::text ILIKE ${searchPattern}`
  );
}

function buildFilterConditions(params: FilterParams): SQL | undefined {
  const conditions: SQL[] = [];

  if (params.search) {
    const searchClause = buildSearchWhereClause(params.search);
    if (searchClause) conditions.push(searchClause);
  }

  if (params.state) {
    conditions.push(eq(advocatesSchema.state, params.state));
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}

function buildOrderByClause(sort: SortDirection = 'asc'): SQL[] {
  if (sort === 'asc') {
    return [asc(advocatesSchema.lastName), asc(advocatesSchema.firstName)];
  }
  return [desc(advocatesSchema.lastName), desc(advocatesSchema.firstName)];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();
    const state = searchParams.get("state")?.trim();
    const sort = searchParams.get("sort")?.trim();
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "20"));
    const offset = (page - 1) * limit;

    const sortDirection: SortDirection = sort === 'desc' ? 'desc' : 'asc';
    const orderByClause = buildOrderByClause(sortDirection);

    const whereClause = buildFilterConditions({ search, state });

    // Build data query with sort by lastName, firstName
    const baseDataQuery = db
      .select()
      .from(advocatesSchema)
      .orderBy(...orderByClause);

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
