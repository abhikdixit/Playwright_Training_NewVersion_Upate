import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "weborder_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Generic query function
export const query = async <T>(sql: string): Promise<T> => {
  const [rows] = await pool.execute(sql);
  return rows as T;
};

// Close DB pool
export const close = async () => {
  await pool.end();
};