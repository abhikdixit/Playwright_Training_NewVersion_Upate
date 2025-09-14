import { createConnection } from "mysql2";

// Create a connection to the database
const connection = createConnection({
    host: "localhost",
    Port: 3306,
    user: "root",
    password: "root",
    database: "weborder_db",
    insecureAuth: true
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Function to query the database
const queryDatabase = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

export default { queryDatabase, connection };