import express from "express";
import { handleHomePage } from "../controllers/home.controllers.js";
const router = express.Router();
console.log("Hello");
router.get("/", handleHomePage);

export { router };
