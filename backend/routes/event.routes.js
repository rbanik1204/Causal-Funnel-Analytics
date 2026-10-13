import { handleViewEvent } from "../controllers/event.controllers.js";
import express from "express";
const router = express.Router()

router
    .post('/events',handleViewEvent)

export { router }