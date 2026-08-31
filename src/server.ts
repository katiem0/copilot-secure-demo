import "dotenv/config";

import { createApp } from "./app.js";
import type { Database, QueryResult } from "./database.js";

const database: Database = {
  async query<T>(): Promise<QueryResult<T>> {
    return { rows: [] };
  },
};

const port = Number(process.env.PORT ?? 3000);
createApp(database).listen(port, () => {
  console.log(`Demo API listening on http://localhost:${port}`);
});