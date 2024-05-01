import pool from "../../config/database.js";

const create = (data, callBack) => {
  const values = [data.firstName, data.lastName, data.email, data.password];
  pool.query(
    `INSERT INTO users (firstname,lastname,email,password) VALUES (?)`,
    [values],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const getUsers = (callBack) => {
  pool.query(
    "select id,firstname,lastname,email from users",
    [],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const getUserById = (id, callback) => {
  pool.query(
    "select id,firstname,lastname,gender,email from signup where id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
};

const getUserByEmail = (email, callback) => {
  pool.query(
    "select * from users where email = ?",
    [email],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};
export { create, getUsers, getUserById, getUserByEmail };
