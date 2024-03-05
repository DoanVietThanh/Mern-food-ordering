import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { appRoutes } from "./routes";
import express, { Application, Response, Request } from "express";
import morgan from "morgan";
import { dbConnect } from "./config/dbConnect";
import { errorHandler, notFound } from "./middleware/errorHandler";

const app: Application = express();
dotenv.config();

const PORT = process.env.PORT_SERVER || 4000;

dbConnect();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// List of Routes
app.use("/api/user", appRoutes.userRoutes);
app.use("/api/order", appRoutes.orderRoutes);
app.use("/api/restaurant", appRoutes.restaurantRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.send({ "message: ": "Health OK" });
});

// Handle Error
app.use(notFound);
app.use(errorHandler);

// Run Server
app.listen(PORT, () => {
  console.log("Server on port: ", PORT);
});
