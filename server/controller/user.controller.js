import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {verifyToken , decodeJwtToken} from "../middlewares/verifyJwtToken.js";

export const getUserForSidebar = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId
        console.log("userId in get user chats: ",userId);
        
        if(!userId){ 
            throw new ApiError(
                400, 
                "User not found", 
                false , 
                "User not found");
        }   


        const filteredUsers = await User.find({
            _id : {
                $ne : userId
            }   
        }).select("-password ");  

        if(!filteredUsers){
            throw new ApiError(
                400, 
                "Users not found", 
                false , 
                "Users not found");
        }   



        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                filteredUsers,
                "Users fetched successfully",
                true
            )
        )
    } catch (error) {
        throw new ApiError(500, "Internal server error", false , error.message);    
    }
})