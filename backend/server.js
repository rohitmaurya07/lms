import express from "express"
import 'dotenv/config'
import dotenv from 'dotenv'
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"

dotenv.config({ path: '/custom/path/to/.env' })

const app = express()
const PORT = process.env.PORT || 4000

connectDB()

// Middlewares
app.use("/api/v1/user",userRoute)

app.get("/",(req,res)=>{
    res.send("hello world")
})


app.listen(PORT,()=>{
    console.log(`Server is Listening on PORT ${PORT}`);
    
})