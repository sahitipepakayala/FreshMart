const { Admin } = require("../models/admin");
const jwt=require("jsonwebtoken");
require('dotenv').config();

const adminAuth=async (req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(500).send("no token found in adminauth middleware");
        }
        const decode= jwt.verify(token,process.env.TOKEN);
        const admin=await Admin.findById(decode._id);
        if(!admin)
            return res.status(500).send("no admin found");
        req.admin=admin;
        next();

    }
    catch(error){
        console.log(error);
       return res.status(500).send("error in adminauth middleware");
    }
}


module.exports={adminAuth}