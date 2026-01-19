CREATE TABLE "capabilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "capabilities_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "capability_roadmap" (
	"id" serial PRIMARY KEY NOT NULL,
	"capability_id" integer NOT NULL,
	"roadmap_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "capability_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"capability_id" integer NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roadmap" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"related_roadmaps" text,
	"viewable" boolean DEFAULT false NOT NULL,
	"created_by" text DEFAULT 'roadmap.sh' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "roadmap_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "skill_roadmap" (
	"id" serial PRIMARY KEY NOT NULL,
	"skill_id" integer NOT NULL,
	"roadmap_id" text NOT NULL,
	"viewable" boolean DEFAULT false NOT NULL,
	"created_by" text DEFAULT 'roadmap.sh' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "suggested_roadmap" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_user_id" text NOT NULL,
	"to_user_id" text NOT NULL,
	"roadmap_id" text NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"test_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_favorite_roadmap" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"roadmap_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_favorite_skill" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"skill_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "skill" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "skill" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "skill" ADD COLUMN "machine_name" text;--> statement-breakpoint
ALTER TABLE "skill" ADD COLUMN "blob_url" text;--> statement-breakpoint
ALTER TABLE "skill" ADD COLUMN "big_skill" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "skill" ADD COLUMN "xp_level" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "skill" ADD COLUMN "made_by" text DEFAULT 'roadmap.sh';--> statement-breakpoint
ALTER TABLE "capability_roadmap" ADD CONSTRAINT "capability_roadmap_capability_id_capabilities_id_fk" FOREIGN KEY ("capability_id") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "capability_user" ADD CONSTRAINT "capability_user_capability_id_capabilities_id_fk" FOREIGN KEY ("capability_id") REFERENCES "public"."capabilities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "capability_user" ADD CONSTRAINT "capability_user_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skill_roadmap" ADD CONSTRAINT "skill_roadmap_skill_id_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "suggested_roadmap" ADD CONSTRAINT "suggested_roadmap_from_user_id_user_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "suggested_roadmap" ADD CONSTRAINT "suggested_roadmap_to_user_id_user_id_fk" FOREIGN KEY ("to_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_favorite_roadmap" ADD CONSTRAINT "user_favorite_roadmap_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_favorite_skill" ADD CONSTRAINT "user_favorite_skill_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_favorite_skill" ADD CONSTRAINT "user_favorite_skill_skill_id_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE cascade ON UPDATE no action;