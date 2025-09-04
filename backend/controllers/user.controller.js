import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async(req,res)=>{
    try {
        const {name,email,pass} = req.body;
        console.log(name,email,pass);
        
        if (!name || !email || !pass) {
            return res.status(400).json({success: false,message: "All fields are required"})
        }
        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({success: false,message: "User Already Exists"})
        }
        const hashedPass = await bcrypt.hash(pass,10)
        await User.create({
            name,
            email,
            pass: hashedPass
        })
        return res.status(201).json({
            success: true,
            message: "Account Created Successfully"
        })
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to register"
        })
    }
}

export const login = async (req,res)=>{
    try {
        const {email,pass} = req.body;
        if (!email || !pass) {
            return res.status(400).json({
                success: false,
                message: "all inputs are required"
            })
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email and passoword"
            })
        }
        const isPasswordMatch = await bcrypt.compare(pass,user.pass)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email and passoword"
            })
        }

        generateToken(res,user,`Welcome Back ${user.name}`)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to Login"
        })
    }
}