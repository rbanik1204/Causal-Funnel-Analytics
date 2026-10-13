import mongoose from 'mongoose'

async function handleValidateEvent(req, res, next) {
    try {
        if (!req.body.session_id) throw new Error({
            success:false,
            message: "Invalid session id"
        })
        else if (!req.body.coordinates || !req.body.coordinates.x || !req.body.coordinates.y) throw new Error({
            success:false,
            message: "Invalid coordinates"
        })
        else if (!req.body.page_url.startsWith('http://[::1]:3000/api/events')) throw new Error({
            success:false,
            message: "Invalid page url"
        })
        else if(!(req.body.event_type in ["click,page_view"]))throw new Error({
            success:false,
            message:"Invalid event type"
        })
    }
    catch (err) {
        next(err)
    }
}
async function handleStoreEvent(req, res) {
    try {

    }
    catch (err) {

    }
}


export { handleViewEvent }