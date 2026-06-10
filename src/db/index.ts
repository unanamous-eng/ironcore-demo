import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let poolInstance: Pool | null = null;
let dbInstance: NodePgDatabase | null = null;

function getPool(): Pool {
  if (poolInstance) return poolInstance;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your environment variables."
    );
  }

  poolInstance = new Pool({ connectionString: databaseUrl });
  return poolInstance;
}

function getDb(): NodePgDatabase {
  if (dbInstance) return dbInstance;

  dbInstance = drizzle(getPool());
  return dbInstance;
}

export const db = new Proxy({} as NodePgDatabase, {
  get(_target, prop: string | symbol) {
    const real = getDb();
    const val = (real as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof val === "function") {
      return val.bind(real);
    }
    return val;
  },
});

export const pool = new Proxy({} as Pool, {
  get(_target, prop: string | symbol) {
    const real = getPool();
    const val = (real as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof val === "function") {
      return val.bind(real);
    }
    return val;
  },
});
