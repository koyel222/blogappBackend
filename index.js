const express=require("express")
const app=express();
app.use(express.json());

require("dotenv").config()
const port=process.env.port||8000;

app.listen(port,()=>{
    console.log("app started ",port)
})

const router=require("./route/route")

app.use("/api/v1",router);
require("./config/database").dbconnect();
