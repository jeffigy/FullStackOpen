import { DATABASE_URL } from "@/config/env.config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    url: DATABASE_URL,
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/db/schema.ts",
});
