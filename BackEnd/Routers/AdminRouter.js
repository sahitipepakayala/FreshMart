const express=require("express");
const { Admin } = require("../models/admin");
const bcrypt=require("bcryptjs");
const adminRouter=express.Router();

adminRouter.post("/signup",async (req,res)=>{
    const {name,emailId,password,number}=req.body;
    const user=await Admin.findOne({emailId:emailId});
    try{
    if(user){
        throw new Error("User exists");
    }
    const hashPassword=await bcrypt.hash(password,10);
    const user1=new Admin({
        name,emailId,password:hashPassword,number
    });
   await user1.save();

   const token=await user1.getJwt();
   res.cookie("token",token);
   res.send(user1);
}
catch(error)
{
    console.log(error);
    res.status(500).send("Invalid Credentials")
}

})


adminRouter.post("/login",async(req,res)=>{
    const {emailId,password}=req.body;
    try{
        const user1=await Admin.findOne({emailId:emailId});
        if(!user1){
            throw new Error("No user found");
        }
        const check=await user1.validatePassword(password);
        if(!check)
        {
            throw new Error("Incorrect password");
        }
        const token=await user1.getJwt();
        res.cookie("token",token);
        res.send(user1);

    }
    catch(error){
        res.status(500).send("User Not found catch error");
    }
})


adminRouter.get("/logout",async(req,res)=>{
    res.clearCookie("token");
    res.send("Logged out successfully");
})

module.exports={adminRouter}