import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";
import { createUser, getCurrentUser, updateCurrentUser } from "../controller/UserCtrl";

export const userRoutes = express.Router();

userRoutes.get("/", jwtCheck, jwtParse, getCurrentUser);
userRoutes.post("/", jwtCheck, createUser);
userRoutes.put("/", jwtCheck, jwtParse, validateUserRequest, updateCurrentUser);
