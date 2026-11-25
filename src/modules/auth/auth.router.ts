import { Router } from "express";
import { loginUser, signUp, updateUser } from "./auth.controller";

const router = Router();

router.post("/signup", signUp);
router.put("/:id", updateUser);
router.post("/login", loginUser);

export default router;
