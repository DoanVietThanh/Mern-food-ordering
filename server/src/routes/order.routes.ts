import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { createCheckoutSession, stripeWebhookHandler } from "../controller/OrderCtrl";

export const orderRoutes = express.Router();

orderRoutes.post("/checkout/create-checkout-session", jwtCheck, jwtParse, createCheckoutSession);
orderRoutes.post("/checkout/webhooks", stripeWebhookHandler);
