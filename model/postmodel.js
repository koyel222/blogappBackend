

const mongoose=require("mongoose")

const postscehema=new mongoose.Schema({
    user_name:{
        type:String,
        required:true,

    },

    title:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,

    },

    post_time:{
        type:String,
        default:Date.now(),

    },

    edit_time:{
        type:String,
        default:Date.now(),

    }
})
module.exports=mongoose.model("post",postscehema);