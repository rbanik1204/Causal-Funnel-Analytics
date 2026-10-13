import mongoose from 'mongoose'

async function handleViewEvent(req,res){
    return res.send(req.body)
}

export {handleViewEvent}