CREATE TABLE "project_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "project_role_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "role" RENAME TO "access_role";--> statement-breakpoint
ALTER TABLE "project_user" DROP CONSTRAINT "project_user_role_id_role_id_fk";
--> statement-breakpoint
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_role_id_role_id_fk";
--> statement-breakpoint
ALTER TABLE "project_user" ADD CONSTRAINT "project_user_role_id_project_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."project_role"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_access_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."access_role"("id") ON DELETE cascade ON UPDATE no action;