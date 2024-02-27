import { Request, Response } from "express";
import { UserModel } from "../model/userModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await UserModel.findOne({ auth0Id });
    if (existingUser) {
      return res.json({ message: "Existed User", data: existingUser });
    }
    const newUser = await UserModel.create(req.body);
    await newUser.save();
    res.status(201).json({
      message: "Create User successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
