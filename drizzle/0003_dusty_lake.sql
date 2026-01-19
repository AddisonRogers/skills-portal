CREATE TABLE "job_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT "job_role_title_unique" UNIQUE("title")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "job_role_id" integer;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_job_role_id_job_role_id_fk" FOREIGN KEY ("job_role_id") REFERENCES "public"."job_role"("id") ON DELETE set null ON UPDATE no action;