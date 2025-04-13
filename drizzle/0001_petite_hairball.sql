ALTER TABLE "advocates" ADD COLUMN "generatedTextSearch" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', 
      coalesce("advocates"."first_name", '') || ' ' || 
      coalesce("advocates"."last_name", '') || ' ' || 
      coalesce("advocates"."city", '') || ' ' || 
      coalesce("advocates"."degree", '') || ' ' ||
      coalesce(cast("advocates"."years_of_experience" as text), '') || ' ' ||
      coalesce(cast("advocates"."phone_number" as text), '') || ' ' ||
      coalesce(cast("advocates"."payload" as text), '')
    )) STORED;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_text_search" ON "advocates" USING gin ("generatedTextSearch");