import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import config from "@/lib/config";

if (!config.env.databaseUrl) {
    throw new Error('No database connection string was provided. Please set the DATABASE_URL environment variable.');
  }
const sql = neon(config.env.databaseUrl!);
export const db = drizzle({ client: sql });
