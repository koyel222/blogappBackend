

const express=require("express")
const router=express.Router();

const{createpost,deletepost,updatepost,readpost,readpostbyid}=require("../controller/post_controller")

    router.post("/create",createpost);
    router.delete("/delete/:id",deletepost);
    router.put("/update/:id",updatepost);
    router.get("/read",readpost);
    router.get("/single/:id",readpostbyid)

module.exports=router;
