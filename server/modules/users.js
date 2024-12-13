import mongoose from "mongoose";

//create a schema for User
const userSchema = new mongoose.Schema({
    userName :{
        type:String,
        required:true,
    } ,
    email:{
        type:String,
        required:true,
    } ,
    passwordHash : {
        type:String,
        required:true,
    } ,
    role :{
        type:String,
        default:"user"
    },
},
{ timestamps: true }
);

const User = mongoose.model("User" , userSchema)

export default User;