import { handleViewSessionsCount,handleViewSessionEvents } from "../controllers/session.controllers.js";
import { handleValidateEvent, handleStoreEvent } from "../controllers/event.controllers.js";
import { handleGetPageClicks } from "../controllers/heatmap.controllers.js";
import express from "express";
const router = express.Router();

router
    .get('/sessions/:session_id/events',handleViewSessionEvents)
    .get('/heatmap',handleGetPageClicks)
    .get('/sessions',handleViewSessionsCount)
    .post('/events',handleValidateEvent,handleStoreEvent);
export { router }