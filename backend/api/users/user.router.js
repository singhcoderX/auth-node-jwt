import { createUser, fetchUsers, loginUser } from "./user.controller.js";
import { Router } from "express";
import checkToken from "../../auth/token_validation.js";

const router = Router();

router.post("/", checkToken, createUser);
router.get("/", checkToken, fetchUsers);

router.post("/login", loginUser);
export default router;
