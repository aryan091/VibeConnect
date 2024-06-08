import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    username:{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    gender : {
        type : String,
        required : true,
        enum : ['Male', 'Female', 'Others']
    },
    profilePic : {
        type : String,
        default:""
    },

},
{
    timestamps : true
}
)

const User = mongoose.model('User', userSchema)

export default User