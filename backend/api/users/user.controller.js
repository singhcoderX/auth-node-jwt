import { create, getUsers, getUserByEmail } from "./user.service.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createUser = (req, res) => {
  const body = req.body;

  //encrypt password before creating a user
  const salt = bcryptjs.genSaltSync(10);
  body.password = bcryptjs.hashSync(body.password, salt);
  create(body, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    } else {
      return res.status(200).json({
        sucess: 1,
        data: results,
      });
    }
  });
};

const fetchUsers = (req, res) => {
  getUsers((error, results) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: "Database Connection Error",
      });
    } else {
      return res.status(200).json({
        success: 1,
        data: results,
      });
    }
  });
};

const loginUser = (req, res) => {
  const body = req.body;
  getUserByEmail(body.email, (error, results) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: "Database Connection Error",
      });
    }
    if (!results) {
      return res
        .status(200)
        .json({ success: 0, data: "Invalid email or password" });
    }
    const result = bcryptjs.compareSync(body?.password, results?.[0]?.password);
    if (result) {
      results[0].password = null;
      try {
        const jsonToken = jwt.sign({ result: results }, process.env.TOKEN_KEY, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          success: 1,
          data: "Success",
          token: jsonToken,
        });
      } catch (error) {
        return res.status(200).json({
          success: 0,
          data: "Login failed check your Email/Password",
        });
      }
    }
    return res.status(200).json({
      success: 0,
      data: "Login failed check your Email/Password",
    });
  });
};
export { createUser, fetchUsers, loginUser };
