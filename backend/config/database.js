import dotenv from "dotenv";
dotenv.config();
import * as mysql from "mysql"; // Import the entire mysql module
console.log(process.env.DB_PORT);

var obj = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
};
console.log(obj);
const pool = mysql.createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
});

export default pool; // Export the pool using the default export syntax
