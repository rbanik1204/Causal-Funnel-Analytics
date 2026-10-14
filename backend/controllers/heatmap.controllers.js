import Event from '../models/event.model.js'

export async function handleGetPageClicks(req,res){
    const { url } = req.query
    const clicks = await Event.find({
        page_url:url,
        event_type:"click"
    }).select("coordinates timestamp -_id");
    if (clicks.length === 0) return res.status(400).send({
        success:true,
        message:`No clicks on ${url}`
    })
    res.status(200).send(clicks)
}