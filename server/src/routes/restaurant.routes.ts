import express from "express";
import multer from "multer";
import { createRestaurant } from "../controller/RestaurantCtrl";
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

restaurantRoutes.post("/", upload.single("imageFile"), validateRestaurantRequest, jwtCheck, jwtParse, createRestaurant);
