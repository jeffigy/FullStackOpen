import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DATABASE_URL } from "../config/env.config";

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const connectDb = async () => {
  try {
    await pool.query("Select NOW()");
    console.log("Connected to db");
  } catch (error: unknown) {
    console.log("Error connecting to db", error);
    process.exit(1);
  }
};

const db = drizzle({ client: pool });
export default db;
