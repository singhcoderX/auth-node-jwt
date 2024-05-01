import { createUser, fetchUsers, loginUser } from "./user.controller.js";
import { Router } from "express";
const router = Router();

router.post("/", createUser);
router.get("/", fetchUsers);

router.post("/login", loginUser);
export default router;
