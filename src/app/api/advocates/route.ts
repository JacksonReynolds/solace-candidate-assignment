import { sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

const toTsQueryArg = (query: string) =>
  query
    .trim()
    .split(/\s+/)
    .map((term) => `${term}:*`)
    .join(" & ");

const fuzzySearchQuery = (searchTerm: string) => sql`(
  setweight(to_tsvector('english', ${advocates.firstName}), 'A') ||
  setweight(to_tsvector('english', ${advocates.lastName}), 'A') ||
  setweight(to_tsvector('english', ${advocates.city}), 'A') ||
  setweight(to_tsvector('english', ${advocates.degree}), 'A') ||
  setweight(to_tsvector('english', cast(${advocates.yearsOfExperience} as text)), 'A') ||
  setweight(to_tsvector('english', cast(${advocates.specialties} as text)), 'A') ||
  setweight(to_tsvector('english', cast(${advocates.phoneNumber} as text)), 'A')
    @@ to_tsquery('english', ${searchTerm})
  )`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchInput = searchParams.get("search") ?? "";
  const searchTerm = toTsQueryArg(searchInput);

  const data = searchInput
    ? await db.select().from(advocates).where(fuzzySearchQuery(searchTerm))
    : await db.select().from(advocates);

  return Response.json({ data });
}
