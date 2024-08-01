import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const db = new pg.Pool({
  ssl: true,
  connectionString: process.env.TECHDB_CONNECTION_STRING,
});
