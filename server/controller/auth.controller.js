import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {verifyToken , decodeJwtToken} from "../middlewares/verifyJwtToken.js";

 export const registerUser = asyncHandler(async (req, res) => {
    
    try {
        const { fullName , username, password , confirmPassword , gender } = req.body;
    
        if(!fullName || !username || !password || !confirmPassword || !gender){
             throw new ApiError(400,"All fields are required", false , "Please fill all fields");
        }                                                               
    
        if(password !== confirmPassword){   
            throw new ApiError(400, "Passwords do not match", false , "Passwords do not match");
        }   

        const existedUser = await User.findOne({username})
        if(existedUser)
            {

            throw new ApiError(
                400, 
                "User already exists", 
                false , 
                "User already exists");
            }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const profilePic = gender === "Male" ? boyProfilePic : girlProfilePic

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
    
        const user = new User( {
            fullName,
            username,       
            password: hashedPassword,
            gender,
            profilePic
        })
        
        await user.save();


    
        return res.status(200).json(
            new ApiResponse(
                200, 
                "User created successfully", 
                user
             , true
            ));
    } catch (error) {
        throw new ApiError(
            500, 
            "Internal server error", 
            false , 
            error.message
        );
    }
});    

export const loginUser = asyncHandler(async (req, res) => {
    
    try {
        const { username, password } = req.body;
    
        if(!username || !password){
            throw new ApiError(
                400,
                "All fields are required", 
                false, 
                "Please fill all fields");
        }                                                               
    

        const user = await User.findOne({ username });

        if(!user){
            throw new ApiError(
                400, 
                "User not found", 
                false , 
                "User not found");
        }   

        const isMatch = await bcryptjs.compare(password, user?.password || "");
        if(!isMatch){
            throw new ApiError( 
                400, 
                "Incorrect password", 
                false , 
                "Incorrect password");
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d", 
        })

        const loggedInUser = await User.findById(user._id).select("-password")

        if(!loggedInUser){
            throw new ApiError(
                400, 
                "User not found", 
                false , 
                "User not found");
        }

        res.cookie("token", token, 
            { 
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24), httpOnly: true, sameSite: "strict", secure: true 
            }
        );
    
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "User logged in successfully",
                {
                    user : loggedInUser,
                    token:token
                },
                true
            )
        )
    } catch (error) {
        throw new ApiError(500, "Internal server error", false , error.message);
    }       
}); 

export const getUserProfile = asyncHandler(async (req, res) => {
    try {   
        const userId = decodeJwtToken(req.headers["authorization"]);

        if(!userId){
            throw new ApiError(
                400, 
                "User not found", 
                false , 
                "User not found");
        }

        const user = await User.findById(userId).select(
            "-password "
        );
        

        if(!user){
            throw new ApiError(
                400, 
                "User not found", 
                false , 
                "User not found");
        }



        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "User profile fetched successfully",
                user,
                true
            )
        )
    }
    catch (error) {
        throw new ApiError(500, "Internal server error", false , error.message);
    }
})

export const logoutUser = asyncHandler(async (req, res) => {
    try {
        return res
        .clearCookie("token" , { expires: new Date(Date.now() + 1000 * 60 * 60 * 24), httpOnly: true, sameSite: "strict", secure: true })
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "User logged out successfully",
                true
            )
        )
    } catch (error) {
        throw new ApiError(500, "Internal server error", false , error.message);
    }
})