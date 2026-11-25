import bcrypt from "bcrypt";
import { pool } from "../../db";
import { generateToken } from "../../utils/jwt";
import type {
  ILoginPayload,
  ILoginResponse,
  ISignupPayload,
  IUser,
} from "./auth.interface";

//signUpDb
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

// updateUserDb
const updateUserDb = async (
  id: string,
  payload: Partial<ISignupPayload>
): Promise<IUser | null> => {
  const { name, email, password, role } = payload;

  // Hash password with bcrypt
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  // Create User query
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

const loginUserIntoDB = async (
  payload: ILoginPayload
): Promise<ILoginResponse | null> => {
  const { email, password } = payload;

  const result = await pool.query(
    `SELECT id, name, email, password, role, created_at, updated_at
     FROM users
     WHERE email = $1`,
    [email]
  );

  const user = result.rows[0] as IUser | undefined;

  if (!user || !user.password || !user.id || !user.role) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  const token = generateToken({
    id: user.id,
    name: user.name,
    role: user.role,
  });

  const { password: _password, ...safeUser } = user;

  return {
    token,
    user: safeUser,
  };
};

export { signUpDb, updateUserDb, loginUserIntoDB };
