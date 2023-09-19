const mongoose=require("mongoose")
require("dotenv").config()


exports.dbconnect=(()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })

    .then(()=>{
        console.log("connection is successfully")
    })

    .catch((err)=>{
        console.log("connection is not sucessfully")
    })
})