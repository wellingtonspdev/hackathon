import mysql from 'mysql2/promise';

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

const pool =
  global._mysqlPool ||
  mysql.createPool({
    host: process.env.DB_HOST || 'sql.freedb.tech',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'u_5ceDN5',
    password: process.env.DB_PASSWORD || 'PAVoCvgsxckJ',
    database: process.env.DB_NAME || 'freedb_DmnP70mB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
  });

if (process.env.NODE_ENV !== 'production') {
  global._mysqlPool = pool;
}

export async function query<T = any>(sql: string, values?: any[]): Promise<T> {
  const [rows] = await pool.query(sql, values);
  return rows as T;
}

export default pool;
