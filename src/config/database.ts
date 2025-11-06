import { Pool } from "pg";

export const pool = new Pool({
  connectionString: "postgresql://root:root@db:5432/fhchallenge",
});
