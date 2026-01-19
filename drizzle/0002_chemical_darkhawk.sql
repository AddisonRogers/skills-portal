ALTER TABLE "user" DROP CONSTRAINT "user_location_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE set null ON UPDATE no action;