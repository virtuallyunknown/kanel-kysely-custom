import pg from 'pg';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import DB from './types/db.js';

const { Pool } = pg;

export const db = new Kysely<DB>({
    dialect: new PostgresDialect({
        pool: new Pool({
            user: '', // <= username
            password: '', // <= password
            database: 'barca',
            host: 'localhost',
            port: 5432,
        }),
    }),
    plugins: [new CamelCasePlugin()],
    log: ['query'],
});