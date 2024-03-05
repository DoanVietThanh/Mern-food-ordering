import { ObjectId } from "mongoose";

export type UserModelProps = {
  _id: ObjectId;
  auth0Id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};
