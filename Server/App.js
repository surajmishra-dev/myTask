// IMPORTS
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/Auth.js";

// APP CONFIGURATION
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const db_url = process.env.DB_URL;

// DB CONNECTION
mongoose
  .connect(db_url, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB CONNECTION SUCCESSFUL"))
  .catch(() => console.log("DB NOT CONNECTED"));

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ROUTES
app.use("/api", authRouter);

// PORT LISTENING
app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT ${port}`));
