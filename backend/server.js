import {app} from './app.js'
import { connectMongoDB } from './configs/mongoose.connect.js'
const PORT = process.env.PORT || 3000
const tempVar = connectMongoDB(process.env.MONGO_URI)
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`server running at:${PORT}`)
})