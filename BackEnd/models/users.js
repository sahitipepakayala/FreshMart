const mongoose=require("mongoose");
const validator=require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a correct mail address from user model");
            }
        }
    },
    admin: {
        type: Boolean,
        default: false
      },      
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Not a strong password from user model");
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
})



userSchema.methods.getJwt=async function(){
    const user=this;
   const token= await jwt.sign({_id:user._id},process.env.TOKEN);
    return token;
}


userSchema.methods.validatePassword=async function(password){
    const user=this;
    const check=await bcrypt.compare(password,user.password);
    return check;
}

const User=mongoose.model("User",userSchema);

module.exports={User};