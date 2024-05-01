import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// jwt.verify()

const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    //removing bearer
    token = token.slice(7);
    jwt.verify(token, process.env.TOKEN_KEY, (error, decodedObj) => {
      if (error) {
        return res.status(401).json({
          sucess: 0,
          message: "Access Denied: Invalid Token",
        });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({
      sucess: 0,
      message: "Access Denied: unauthorized user",
    });
  }
};

export default checkToken;
