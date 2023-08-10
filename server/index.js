import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./Routes/authRoutes.js"
import mongoose from "mongoose"
import User from "./model/user.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()
const port = 4000
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("db is connected")
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

app.use("/",authRoutes)