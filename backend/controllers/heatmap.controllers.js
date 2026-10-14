import Event from '../models/event.model.js'
import routeExists from '../utils/routeRegistry.js';
import { URL } from 'url'
export async function handleGetPageClicks(req,res){
    const { url } = req.query
    if (typeof url !== "string" ||
        !url.trim()
    ) return res.status(400).send({
        success:false,
        message:"A valid URL query parameter is required"
    })
    const parsedUrl = new URL(url);
    if(!routeExists(parsedUrl.pathname)) return res.status(400).send({
        success:false,
        message:"A valid URL query parameter is required"
    })
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