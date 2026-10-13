import {app} from './app.js'
import { connectMongoDB } from './configs/mongoose.connect.js'
const PORT = process.env.PORT || 3000
const tempVar = connectMongoDB(process.env.MONGO_URI)
app.listen(PORT,'localhost',()=>{
    console.log(`server running at:${PORT}`)
})