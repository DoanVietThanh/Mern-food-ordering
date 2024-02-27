import express from "express";
import { createUser } from "../controller/UserCtrl";

export const userRoutes = express.Router();

userRoutes.post("/", createUser);
