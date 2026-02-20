const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'jwt_auth',
    password: 'tyuxtv6c68',
});


module.exports = pool;