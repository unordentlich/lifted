import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

if(!pool) {
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true, 
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true
      });
}

export default pool;