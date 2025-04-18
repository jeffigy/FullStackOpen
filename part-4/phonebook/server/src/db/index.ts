import { DATABASE_URL } from "@/config/env.config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const connectDb = async () => {
  try {
    const client = await pool.connect();
    const { rows } = await client.query<{ now: string }>("SELECT NOW()");
    console.log("Connected to db at:", rows[0].now);
    client.release();
  } catch (error) {
    console.log("Error connecting to db", error);
    process.exit(1);
  }
};

const db = drizzle({ client: pool, schema });
export default db;
