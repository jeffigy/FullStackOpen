CREATE TABLE "notes" (
	"note_id" varchar PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"important" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
