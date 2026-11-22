import { Router } from "express";

const router = Router()
// create user
router.put("/:id",authController.updateUser)