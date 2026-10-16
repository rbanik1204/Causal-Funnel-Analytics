import Event from "../models/event.model.js";

export async function handleViewSessionsCount(req, res, next) {
  try {
    const sessions = await Event.aggregate([
      {
        $group: {
          _id: { session_id: "$session_id", event_type: "$event_type" },
          total_events: { $sum: 1 },
        },
      },
    ]);
    if (sessions.length === 0)
      return res.status(204).send({
        success: true,
        message: "No Content",
      });
    return res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (err) {
    err.success = false;
    next(err);
  }
}
export async function handleViewSessionEvents(req, res, next) {
  const { session_id } = req.params;
  try {
    const events = await Event.find({
      session_id: session_id,
    })
      .sort({ timestamp: 1 })
      .lean();
    if (events.length === 0)
      return res.status(204).send({
        success: true,
        message: "No Content",
      });
    return res.status(200).send({
      success: true,
      events: events,
    });
  } catch (err) {
    err.success = false;
    next(err);
  }
}
