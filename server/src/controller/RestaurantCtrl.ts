import { Request, Response } from "express";
import { RestaurantModel } from "../model/restaurantModel";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

// API: Get My Restaurant
export const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await RestaurantModel.findOne({
      user: req.userId,
    });
    if (!existingRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.json(existingRestaurant);
  } catch (error: any) {
    res.status(500).json({ message: "Fail to get Restaurant" });
  }
};

// API: Create My Restaurant
export const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await RestaurantModel.findOne({
      user: req.userId,
    });
    if (existingRestaurant) {
      return res.status(409).json({ message: "User restaurant already exists" });
    }
    // Save record Restaurant
    const restaurant = new RestaurantModel(req.body);
    restaurant.imageUrl = await uploadImage(req.file as Express.Multer.File);
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();
    res.status(201).json({ message: "Created successfully", data: restaurant });
  } catch (error: any) {
    res.status(500).json({ message: "Fail to create Restaurant" });
  }
};

// API: Update My Restaurant
export const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await RestaurantModel.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();
    if (req.file) {
      restaurant.imageUrl = await uploadImage(req.file as Express.Multer.File);
    }
    await restaurant.save();
    res.status(200).send(restaurant);
  } catch (error: any) {
    res.status(500).json({ message: "Fail to update Restaurant" });
  }
};

// API: Search Restaurant
export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};
    query["city"] = new RegExp(city, "i");
    const cityCheck = await RestaurantModel.countDocuments(query);

    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      // cuisinesArray="italian,burger" => ["italian", "burger"] -> ["/italian/i", "/burger/i"]
      const cuisinesArray = selectedCuisines.split(",").map((cuisine) => new RegExp(cuisine, "i"));
      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [{ restaurantName: searchRegex }, { cuisines: { $in: [searchRegex] } }];
    }
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const restaurants = await RestaurantModel.find(query)
      .sort({ [sortOption]: 1 }) // ascending order by "lastUpdated"
      .skip(skip)
      .limit(pageSize)
      .lean(); // convert to plain object instead of Mongoose document -> improve performance
    const total = await RestaurantModel.countDocuments(query);
    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ message: "Fail to search Restaurant" });
  }
};

// API: Get Restaurant By Id
export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const existingRestaurant = await RestaurantModel.findById(restaurantId);
    if (!existingRestaurant) {
      res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(existingRestaurant);
  } catch (error: any) {
    res.status(500).json({ message: "Fail to get Restaurant" });
  }
};

// Function: Upload Image
const uploadImage = async (file: Express.Multer.File) => {
  const image = file as Express.Multer.File;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.uploader.upload(dataURI, {
    folder: "food-ordering",
  });
  return uploadResponse.url;
};
