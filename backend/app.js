import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'url'
import logger from './middlewares/logger.js'
import globalError from './middlewares/globalError.js'
import {router as eventRouter} from './routes/event.routes.js'
import {router as homeRouter} from './routes/home.routes.js'
const app = express()
dotenv.config({
    override:true,
    silent:true,
    quite:true
})
//HTTP method & requested url Logger Middleware
app.use(logger)

//Built-in middlewares
app.use(express.json()) // ReadableStream `json` to Object
app.use(express.urlencoded({extended:false})) //if form data fetch the ReadableStream and parse it from form data to Object

//ESM work around __dirname doesnt exist
const __filename = fileURLToPath(import.meta.url) //path of the current file that along with app.js
const __dirname = path.dirname(__filename) //gives the exact path by stripping file name

//serve the public directory
app.use(express.static(path.join(__dirname,'public')))//theres no prefix to strip
// Serve the tracker directory.
app.use("/tracker",express.static(path.resolve(__dirname, "../tracker"))); 
app.set("views",path.join(__dirname,'./views'))//or use .resolve(__dirname,'views')
//Set template engine (.ejs,.pug,.jade)
app.set('view engine','ejs')

//CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-app.vercel.app",
  ],
}));
//Routes

app.use('/api',eventRouter)
app.use('/',homeRouter)
//Global Error Middleware
app.use(globalError)
export { app }