import bcrypt from "bcrypt";
import { pool } from "../../db";
import type { ISignupPayload } from "./auth.interface";
import type { IUser } from "./auth.interface";

const signUpDb = async (payload: ISignupPayload): Promise<IUser | null> => {
  const { name, email, password, role } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at`,
    [name, email, hashedPassword, role ?? "contributor"]
  );

  return result.rows[0] ?? null;
};

const updateUserDb = async (
  id: string,
  payload: Partial<ISignupPayload>
): Promise<IUser | null> => {
  const { name, email, password, role } = payload;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  const result = await pool.query(
    `UPDATE users
     SET name = COALESCE($1, name),
         email = COALESCE($2, email),
         password = COALESCE($3, password),
         role = COALESCE($4, role)
     WHERE id = $5
     RETURNING id, name, email, role, created_at`,
    [name ?? null, email ?? null, hashedPassword, role ?? null, id]
  );

  return result.rows[0] ?? null;
};

export { signUpDb, updateUserDb };
