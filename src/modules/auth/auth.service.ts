import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../../db";
import type { ISignupPayload } from "./auth.interface";

const signUpDb = async (payload: ISignupPayload) => {
    const { name, email, password, role } = payload;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const result = await pool.query(
        `INSET INTO user (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role, created_at`,
        [name, email, hashedPassword, role || "contributor"]
    );
    // Return created user
    return result.rows[0];
}