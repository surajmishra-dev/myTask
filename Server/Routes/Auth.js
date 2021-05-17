import express from "express";
import { signin, signup } from "../Controllers/Auth.js";
const authRouter = new express.Router();

// AUTH ROUTES
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

export default authRouter;
