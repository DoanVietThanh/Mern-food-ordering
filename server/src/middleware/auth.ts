import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { UserModel } from "../model/userModel";
import { NextFunction, Request, Response } from "express";
import { JWTPayload, auth } from "express-oauth2-jwt-bearer";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

dotenv.config();

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH_TOKEN_SIGNING_ALG,
});

export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as JWTPayload;
    const auth0Id = decoded.sub;
    const user = await UserModel.findOne({ auth0Id });
    if (!user) {
      return res.sendStatus(401);
    }
    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  } catch (error: any) {
    return res.sendStatus(401);
  }
};
