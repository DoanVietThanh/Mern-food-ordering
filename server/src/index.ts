import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { dbConnect } from "./config/dbConnect";
import express, { Application, Request, Response } from "express";

const app: Application = express();
dotenv.config();

const PORT = process.env.PORT_SERVER || 4000;

dbConnect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("GET request to the homepage");
});

// Run Server
app.listen(PORT, () => {
  console.log("Server on port: ", PORT);
});
