import mongoose from "mongoose";
import { UserModelProps } from "../types/userModel.types";

var userSchema = new mongoose.Schema<UserModelProps>({
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

export const UserModel = mongoose.model("User", userSchema);
