import { Router } from "express";
import { signUp, updateUser } from "./auth.controller";

const router = Router();

router.post("/signup", signUp);
router.put("/:id", updateUser);

export default router;
