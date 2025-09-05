import express from "express"
import 'dotenv/config'
import dotenv from 'dotenv'
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config({ path: '/custom/path/to/.env' })

const app = express()
const PORT = process.env.PORT || 4000

connectDB()

// Deafult Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// Middlewares
app.use("/api/v1/user",userRoute)

app.get("/",(req,res)=>{
    res.send("hello world")
})


app.listen(PORT,()=>{
    console.log(`Server is Listening on PORT ${PORT}`);
    
})