import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import logger from './middlewares/logger.js'
import globalError from './middlewares/globalError.js'
import {router as eventRouter} from './routes/event.routes.js'
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


//Routes
app.use('/api',eventRouter)

//Global Error Middleware
app.use(globalError)
export { app }