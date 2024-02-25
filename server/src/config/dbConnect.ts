import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGOOSE_URL!);
    if (con) console.log("Connect DB successfully");
  } catch (error) {
    console.log("Connect DB fail");
  }
};
