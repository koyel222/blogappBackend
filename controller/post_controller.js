
const post=require("../model/postmodel")



exports.createpost=async(req,res)=>{
    try{
        const{user_name,title,description}=req.body;
        if(!user_name||!title||!description){
            return res.status(400).json({
                success:false,
                message:"enter the details carefully"
            })
        }
        const postcreate=await post.create({user_name,title,description})
        return res.status(200).json({
            success:true,
            message:"created sucessfully",
            postcreate
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"not create the post"
        })
    }
}

exports.deletepost=async(req,res)=>{
    try{
        const{id}=req.params
        await post.findByIdAndDelete(id);
        return res.status(200).json({
            success:true,
            message:"deleted sucessfully",
        
        })


    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"not deleted the post"
        })
    }
}
exports.updatepost=async(req,res)=>{
    try{
        const{id}=req.params
        const{title,description}=req.body
        const postupdate=await post.findByIdAndUpdate(id,{title,description,edit_time:Date.now()})
        return res.status(200).json({
            success:true,
            message:"updated sucessfully",
            postupdate
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"the post is not updated "
        })
    }
}

exports.readpost=async(req,res)=>{
    try{
    const getpost=await post.find({})
    res.status(200).json({
        sucess:true,
        message:"read  successfully",
        getpost
    })

    }catch(err){
        res.status(400).json({
            sucess:false,
            message:"read not  successfully"
        })
    }
}


exports.readpostbyid=async(req,res)=>{
    try{
        const{id}=req.params
        const singlepost=await post.findById(id)
        return res.status(200).json({
            sucess:true,
            message:"read the  single post  successfully",
            singlepost
        })

    }catch(error){
        res.status(400).json({
            sucess:false,
            message:"read by single is not  successfully find "
        })
    }
}