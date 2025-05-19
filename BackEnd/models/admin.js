require('dotenv').config();


const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const validator=require("validator");

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a correct mail address from admin model");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Not a strong password from admin model")
            }
        }
    },
    number:{
        type: String,
        validate: {
          validator: (value) => validator.isMobilePhone(value, 'en-IN'),
          message: 'Invalid mobile number'
        },
        required: true
    }
      ,
      admin: {
        type: Boolean,
        default: true
      }
      
    
},{timestamps:true})




adminSchema.methods.getJwt=async function(){
    const user=this;
   const token= await jwt.sign({_id:user._id},process.env.TOKEN);
    return token;
}


adminSchema.methods.validatePassword=async function(password){
    const user=this;
    const check=await bcrypt.compare(password,user.password);
    return check;
}


const Admin=mongoose.model("Admin",adminSchema);

module.exports={Admin};