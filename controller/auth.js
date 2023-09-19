const { sign } = require("jsonwebtoken");
const user=require("../model/user")
const bcrypt=require("bcrypt")
exports.signup=async(req,res)=>{
    try{
        //fetch the data
        const{name,email_id,password,confirm_password,phone_no}=req.body;

                //validation check
                if(!email_id||!password||!confirm_password||!phone_no){
                    return res.staus(400).json({
                        success:false,
                        message:"enter the details carefully"
                    })
                }

                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if(!emailPattern.test(email_id)){
                    return res.staus(400).json({
                        success:false,
                        message:"enter the emails carefully"
                    })
                }
                if(password!=confirm_password){
                    return res.staus(400).json({
                        success:false,
                        message:"password and confirm password both are not same"
                    })
                }

            //check the email_id present or not
            const finduser=await user.findOne({email_id})
            if(finduser){
                return res.staus(400).json({
                    success:false,
                    message:"already exsits the email_id"
                })
            }
                let strongpassword;
                try{
                strongpassword=await bcrypt.hash("password",10)
                }catch(error){
                    console.log(error);
                    return res.staus(400).json({
                        success:false,
                        message:"internal server error"
                    })
                }

                const newuser=await user.create({name,email_id,password:strongpassword,phone_no})
                return res.staus(200).json({
                    success:true,
                    message:" new user create successfully"
                })
        }
    catch(error){
        console.log(error);
        return res.staus(400).json({
            success:false,
            message:"new user is not created successfully"
        })
    }

}

exports.login=async(req,res)=>{
    try{
        //fetch the data
        const{email_id,password}=req.body
        
        //validation check
        if(!email_id||!password){
            return res.staus(400).json({
                success:false,
                message:"check the details properly"
            })
        }
        //check the email_id present or not
        const finduser=await user.findOne({email_id});

        //if email_id is not present
        if(!finduser){
            return res.staus(400).json({
                success:false,
                message:"email_id is not found"
            })
        }

        //now present the email_id
        //compare the password
        
        if(await bcrypt.compare(password,finduser.password)){
            //true
            const payload={
                name:finduser.name,
                email:finduser.email_id,
                phoneno:finduser.phone_no
            }
            const usertoken=jwt.sign(payload.process.env.JWT_SECRET,{
                expiresIn:"2h"
            })

            const options={
                expires:new Date(Date.now()+2*60*60*1000),
                httpOnly:true
            }
            res.cookie("usercookie",usertoken,options).staus(200).json({
                success:true,
                message:"successfuly login"
            })

        }
        

        //false
        else{
                return res.staus(400).json({
                    success:false,
                    message:"password is not match"
                })
           }
    }catch(error){
        console.log(error);
        return res.staus(400).json({
            success:false,
            message:"login is not successfully"
        })
    }
}