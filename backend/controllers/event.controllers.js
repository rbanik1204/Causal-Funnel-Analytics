import Event from '../models/event.model.js'
import { URL } from 'node:url'
async function handleValidateEvent(req, res, next) {
    const { session_id, event_type, page_url, coordinates } = req.body ?? {};
    console.log("Request body:", req.body);
    console.log("Session ID:", req.body?.session_id);
    console.log("Session ID type:", typeof req.body?.session_id);
    const reject = (message) => {
        const err = new Error(message);
        err.success = false
        err.statusCode = 400
        return next(err)
    }
    if (
        typeof session_id !== "string" ||
        !session_id.trim()
    ) {
        return reject("Invalid session ID");
    }

    if (!["click", "page_view"].includes(event_type)) {
        return reject("Invalid event type");
    }

    if (typeof page_url !== "string") {
        return reject("Invalid page URL");
    }
    try {
        console.log("page_url:", page_url);

        const url = new URL(page_url);

        console.log("Parsed URL:", url.href);
        console.log("Protocol:", JSON.stringify(url.protocol));
        console.log("Allowed:", ["http:", "https:"].includes(url.protocol));

        if (!["http:", "https:"].includes(url.protocol)) {
            return reject("Invalid page URL protocol");
        }
    } catch (err) {
        console.error("URL validation error:", err);
        return reject("Invalid page URL");
    }
    if (event_type === "click") {
        if (
            !coordinates ||
            !Number.isFinite(coordinates.x) ||
            !Number.isFinite(coordinates.y)
        ) {
            return reject("Invalid click coordinates");
        }
    }

    return next();
}
async function handleStoreEvent(req, res, next) {
    try {
        const { session_id,
            event_type,
            page_url,
            timestamp,
            coordinates
        } = req.body;
        try {
            const eventDocument = new Event({
                session_id,
                event_type,
                page_url,
                timestamp,
                ...(event_type === 'click' && { coordinates }),
                ...(timestamp && { timestamp })
            })
            await eventDocument.save();
            return res.status(201).send({
                success: true,
                message: "event inserted successfully",
                data: eventDocument
            })
        } catch (err) {
            err.success = false
            next(err)
        }
    }
    catch (err) {
        err.statusCode = 500;
        err.success = false;
        next(err)
    }
}


export { handleValidateEvent, handleStoreEvent }