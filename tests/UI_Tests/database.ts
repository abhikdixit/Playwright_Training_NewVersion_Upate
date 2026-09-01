// import mysql from 'mysql2/promise';

// const pool = mysql.createPool({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "root",
//   database: "weborder_db",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Generic query function
// export const query = async <T>(sql: string): Promise<T> => {
//   const [rows] = await pool.execute(sql);
//   return rows as T;
// };

// // Close DB pool
// export const close = async () => {
//   await pool.end();
// };

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

// SELECT
export async function query<T>(sql: string, params: any[] = []): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}

// INSERT / UPDATE / DELETE
export async function execute(sql: string, params: any[] = []) {
  const [result] = await pool.execute(sql, params);
  return result;
}

// Generic Insert
export async function insert(table: string, data: Record<string, any>) {

  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data).map(() => "?").join(", ");
  const values = Object.values(data);

  const sql = `
      INSERT INTO ${table}
      (${columns})
      VALUES (${placeholders})
  `;

  await pool.execute(sql, values);
}

// Close connection
export async function close() {
  await pool.end();
}