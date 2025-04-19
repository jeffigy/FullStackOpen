CREATE TABLE "note_users" (
	"username" text NOT NULL,
	"name" text NOT NULL,
	"passwordHash" text NOT NULL,
	"user_id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "user_id" text;