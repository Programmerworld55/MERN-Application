const { default: mongoose, model } = require("mongoose");

// const mongoose=require(mongoose)

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,

    },
    
},{timestamps:true})

const UserModel=mongoose.model('UserModel',UserSchema)
module.exports=UserModel