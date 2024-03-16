import express from "express";
import multer from "multer";
import {
  createMyRestaurant,
  getMyRestaurant,
  getMyRestaurantOrder,
  getRestaurantById,
  searchRestaurant,
  updateMyRestaurant,
  updateOrderStatus,
} from "../controller/RestaurantCtrl";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateRestaurantRequest } from "../middleware/validation";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export const restaurantRoutes = express.Router();

restaurantRoutes.get("/search/:city", searchRestaurant);
restaurantRoutes.get("/detail/:restaurantId", getRestaurantById);
restaurantRoutes.get("/", jwtCheck, jwtParse, getMyRestaurant);
restaurantRoutes.get("/order", jwtCheck, jwtParse, getMyRestaurantOrder);
restaurantRoutes.get("/order/:orderId/status", jwtCheck, jwtParse, updateOrderStatus);

restaurantRoutes.post(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  createMyRestaurant
);

restaurantRoutes.put(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  updateMyRestaurant
);
