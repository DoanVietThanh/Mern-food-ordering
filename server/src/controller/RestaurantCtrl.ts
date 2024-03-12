import { Request, Response } from "express";
import { RestaurantModel } from "../model/restaurantModel";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await RestaurantModel.findOne({ user: req.userId });
    if (!existingRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.json(existingRestaurant);
  } catch (error: any) {
    res.status(500).json({ message: "Fail to get Restaurant" });
  }
};

export const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await RestaurantModel.findOne({
      user: req.userId,
    });
    if (existingRestaurant) {
      return res.status(409).json({ message: "User restaurant already exists" });
    }
    // Create upload
    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.uploader.upload(dataURI, { folder: "food-ordering" });
    console.log("uploadResponse: ", uploadResponse);

    // Save record Restaurant
    const restaurant = new RestaurantModel(req.body);
    restaurant.imageUrl = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();
    res.status(201).json({ message: "Created successfully", data: restaurant });
  } catch (error: any) {
    res.status(500).json({ message: "Fail to create Restaurant" });
  }
};

// uploadResponse:  {
//     asset_id: 'b6384027e4f6df64ef5f3dd669ad510d',
//     public_id: 'food-ordering/ozarzdw68dmgo496fyqa',
//     version: 1709631420,
//     version_id: '05cb74f1afe1df56be2bb3a75c76fa3e',
//     signature: '786a5c7bcd64650cb60a2a5bca41f821d2a9f42e',
//     width: 670,
//     height: 447,
//     format: 'jpg',
//     resource_type: 'image',
//     created_at: '2024-03-05T09:37:00Z',
//     tags: [],
//     bytes: 137216,
//     type: 'upload',
//     etag: '9e90cea12015061940091a7c216f0ebf',
//     placeholder: false,
//     url: 'http://res.cloudinary.com/thanh2k3/image/upload/v1709631420/food-ordering/ozarzdw68dmgo496fyqa.jpg',
//     secure_url: 'https://res.cloudinary.com/thanh2k3/image/upload/v1709631420/food-ordering/ozarzdw68dmgo496fyqa.jpg',
//     folder: 'food-ordering',
//     access_mode: 'public',
//     api_key: '691262638417663'
//   }
