import { Pool } from 'pg';

export const pool = new Pool({
    user:'node_user',
    host: 'localhost',
    database: 'projectdb',
    password:'node_password',
    port:5432
});



