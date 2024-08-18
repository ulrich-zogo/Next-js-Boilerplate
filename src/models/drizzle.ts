import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './Schema';

const sql = postgres(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

export default db;
