// import express from "express";
// import mysql from "mysql";
// import cors from "cors";
// import session from "express-session";
// import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";

// const app = express();
// app.use(
//   cors({
//     origin: ["http://localhost:3005"],
//     methods: ["POST", "GET", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );

// const db = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "Aryan123",
//   database: "signup",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL database:", err.stack);
//     return;
//   }
//   const sql = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       firstName VARCHAR(255) NOT NULL,
//       lastName VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       password VARCHAR(255) NOT NULL
//     )
//   `;
//   console.log("Connected to MySQL database as ID:", db.threadId);
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error creating table:", err);
//       return;
//     }
//     console.log("Table created successfully");
//   });
// });
// db.on("error", (err) => {
//   console.error("MySQL database error:", err.message);
// });

// app.post("/signup", (req, res) => {
//   const sql =
//     "INSERT INTO users (firstname,lastname,email,password) VALUES (?)";

//   const values = [
//     req.body.firstName,
//     req.body.lastName,
//     req.body.email,
//     req.body.password,
//   ];
//   console.log(req.body);
//   db.query(sql, [values], (err, result) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       if (err.code === "ER_DUP_ENTRY") {
//         return res.status(400).json({ message: "Email already exists" });
//       }
//       return res
//         .status(500)
//         .json({ message: "Error inserting user", error: err });
//     }
//     return res.json({ message: "User signed up successfully", result });
//   });
// });
// app.post("/login", (req, res) => {
//   const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

//   const values = [req.body.email, req.body.password];
//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error executing query:", err);

//       return res
//         .status(500)
//         .json({ message: "Error Logging user", error: err });
//     }
//     if (result.length > 0) {
//       req.session.username = result[0].email;
//       console.log(req.session);
//       return res.json({ message: "User Logged in successfully" });
//     } else {
//       return res
//         .status(404)
//         .json({ message: "User Not Found", result: result });
//     }
//     // return res.json({ message: "User signed up successfully", result });
//   });
// });

// app.get("/", (req, res) => {
//   console.log("req", req.session);
//   if (req.session.username) {
//     console.log("req", req.session);
//     return res.json({ valid: true, user: req.session.username });
//   } else {
//     return res.json({ valid: false });
//   }
// });

// app.delete("/logout", (req, res) => {
//   req.session.destroy();
//   return res.json({ message: "User Logged out successfully" });
// });
// app.listen(8080, () => {
//   console.log("Connected to the server");
// });

import dotenv from "dotenv";
import express from "express";
dotenv.config();
const app = express();

app.get("/api", (req, res) => {
  res.json({
    success: 1,
    message: "This is rest API working",
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log("server is up and running on port:", process.env.APP_PORT);
});
