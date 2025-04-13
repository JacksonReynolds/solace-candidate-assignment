import { sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

const toTsQueryArg = (query: string) =>
  query
    .trim()
    .split(/\s+/)
    .map((term) => `${term}:*`) // only allows prefixing unfortunately
    .join(" & ");

const fuzzySearchQuery = (searchTerm: string) => sql`(
  ${advocates.generatedTextSearch} @@ to_tsquery('english', ${searchTerm})
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
