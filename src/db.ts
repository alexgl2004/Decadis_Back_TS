import { Pool } from "pg";

export const db = new Pool({
  user: 'decadis',
  password: 'decadis1',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'Decadis'
});