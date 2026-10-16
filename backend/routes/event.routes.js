import {
  handleViewSessionsCount,
  handleViewSessionEvents,
} from "../controllers/session.controllers.js";
import {
  handleValidateEvent,
  handleStoreEvent,
} from "../controllers/event.controllers.js";
import { handleGetPageClicks } from "../controllers/heatmap.controllers.js";
import { handleHomePage } from "../controllers/home.controllers.js";
import express from "express";
const router = express.Router();

router
  .get("/events", (req, res) => {
    return res.render("index");
  })
  .get("/sessions/:session_id/events", handleViewSessionEvents)
  .get("/heatmap", handleGetPageClicks)
  .get("/sessions", handleViewSessionsCount)
  .post("/events", handleValidateEvent, handleStoreEvent)
  .get("/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "CausalFunnel API is running",
    });
  })
  .get("/", handleHomePage);
export { router };
