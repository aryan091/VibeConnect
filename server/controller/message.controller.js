import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {verifyToken , decodeJwtToken} from "../middlewares/verifyJwtToken.js";


export const sendMessage = asyncHandler(async (req, res) => {

    try 
    {

        const {id:receiverId} = req.params
        const {message} = req.body;
        const senderId = req.userId;


    
        if(!receiverId || !senderId || !message){
            throw new ApiError(
                400, 
                "All fields are required", 
                false , 
                "All fields are required");
        }   

        let conversation = await Conversation.findOne({
            participants : {
                $all : [senderId, receiverId]
            }
        });
    
        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId, receiverId]
            });
        }
    
        const newMessage = new Message({
            senderId,   
            receiverId,
            message
        }); 
    

        if(newMessage){{
            conversation.messages.push(newMessage); 

        }

        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(), newMessage.save()]);

    }
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                newMessage,
                "Message sent successfully",
                true
            )
        )   
      
    } catch (error) {
        throw new ApiError(500, "Internal server error", false , error.message);
        
    }  
})

export const getMessages = asyncHandler(async (req, res) => {
    try {   

        const {id:receiverId} = req.params
        const senderId = req.userId;

        const conversation = await Conversation.findOne({
            participants : {
                $all : [senderId, receiverId]
            }
        }).populate("messages");


        if(!conversation){
            conversation = new Conversation({
                participants: [senderId, receiverId],
                messages: []
            });

            await conversation.save();
        }

        return res  
        .status(200)
        .json(  
            new ApiResponse(
                200,    
                conversation.messages,
                "Messages fetched successfully",
                true
            )
        )
    }

    catch (error) { 
        throw new ApiError(500, "Internal server error", false , error.message);
    }

})