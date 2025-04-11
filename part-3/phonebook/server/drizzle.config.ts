import { DATABASE_URL } from "@/config/env.config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
  out: "./drizzle",
  schema: "./src/db/schema.ts",
});
