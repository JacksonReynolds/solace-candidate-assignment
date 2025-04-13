import { SQL, sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
  index,
  customType,
} from "drizzle-orm/pg-core";

const tsVector = customType<{ data: string }>({
  dataType() {
    return "tsvector";
  },
});

const advocates = pgTable(
  "advocates",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    city: text("city").notNull(),
    degree: text("degree").notNull(),
    specialties: jsonb("payload").default([]).notNull(),
    yearsOfExperience: integer("years_of_experience").notNull(),
    phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    generatedTextSearch: tsVector("generatedTextSearch").generatedAlwaysAs(
      (): SQL => sql`to_tsvector('english', 
      coalesce(${advocates.firstName}, '') || ' ' || 
      coalesce(${advocates.lastName}, '') || ' ' || 
      coalesce(${advocates.city}, '') || ' ' || 
      coalesce(${advocates.degree}, '') || ' ' ||
      coalesce(cast(${advocates.yearsOfExperience} as text), '') || ' ' ||
      coalesce(cast(${advocates.phoneNumber} as text), '') || ' ' ||
      coalesce(cast(${advocates.specialties} as text), '')
    )`
    ),
  },
  (t) => [index("idx_text_search").using("gin", t.generatedTextSearch)]
);

export { advocates };
