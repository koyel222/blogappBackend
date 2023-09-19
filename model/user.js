const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email_id:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone_no:{
        type:String,
        required:true,
    }


})
module.exports=mongoose.model("user",userschema);