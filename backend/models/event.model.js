import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
    {
        session_id: {
            type: String,
            required: true
        },
        event_type: {
            type: String,
            enum: ["page_view", "click"],
            required: true
        },
        page_url: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        coordinates: {
            x: {
                type: Number
                //Optional since page-views doesnt have one
            },
            y: {
                type: Number
            }
        }
    }, {
    timestamps: true
    }
);
eventSchema.index({session_id:1,timestamp:1});
eventSchema.index({page_url:1,event_type:1});
const Event = mongoose.model("Event", eventSchema);
export default Event