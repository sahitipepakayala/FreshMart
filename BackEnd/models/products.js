const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        default:50
    },
    image:{
        type:String,
        default:"https://cdn5.vectorstock.com/i/1000x1000/71/74/fresh-market-logo-design-vector-33337174.jpg"
    }
})


const Product=mongoose.model("Product",productSchema);
module.exports={Product};