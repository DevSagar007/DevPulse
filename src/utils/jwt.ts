import jwt, { type SignOptions } from "jsonwebtoken";
import config from "../config";

export interface IJwtPayload {
  id: number;
  name: string;
  role: "contributor" | "maintainer";
}

export const generateToken = (payload: IJwtPayload): string => {
  const expiresIn = config.jwt_expires_in || "7d";
  const options: SignOptions = {
    expiresIn: expiresIn as NonNullable<SignOptions["expiresIn"]>,
  };

  return jwt.sign(payload, config.jwt_secret, options);
};
