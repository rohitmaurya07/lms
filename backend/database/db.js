import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect to mongodb");
        
    } catch (error) {
        console.log("Error aa Gya Bhai",error);
    }
}

export default connectDB