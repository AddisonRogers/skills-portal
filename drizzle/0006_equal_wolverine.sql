CREATE TABLE "project_user_skill" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_user_id" integer NOT NULL,
	"skill_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_user_skill" ADD CONSTRAINT "project_user_skill_project_user_id_project_user_id_fk" FOREIGN KEY ("project_user_id") REFERENCES "public"."project_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_user_skill" ADD CONSTRAINT "project_user_skill_skill_id_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE cascade ON UPDATE no action;