ALTER TABLE "client_project" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "client_project" CASCADE;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "client_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_project_user" ON "project_user" USING btree ("project_id","user_id");