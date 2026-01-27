ALTER TABLE "project_user" RENAME COLUMN "role_id" TO "project_role_id";--> statement-breakpoint
ALTER TABLE "project_user" DROP CONSTRAINT "project_user_role_id_project_role_id_fk";
--> statement-breakpoint
ALTER TABLE "project_user" ADD CONSTRAINT "project_user_project_role_id_project_role_id_fk" FOREIGN KEY ("project_role_id") REFERENCES "public"."project_role"("id") ON DELETE set null ON UPDATE no action;