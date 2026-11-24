import type { Request, Response } from "express";
import { signUpDb, updateUserDb } from "./auth.service";

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Unexpected error";

const signUp = async (req: Request, res: Response) => {
  try {
    const user = await signUpDb(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!id) {
    res.status(400).json({
      success: false,
      message: "User id is required",
    });
    return;
  }

  try {
    const user = await updateUserDb(id, req.body);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

export { signUp, updateUser };
