const { adminAuth } = require("../Middlewares/adminAuth");
const {Product} =require("../models/products");

const express=require("express");
const productRouter=express.Router();

productRouter.post("/newProduct",async(req,res)=>{
    const {name,price,image}=req.body;
    try{
        const product1=new Product({name,price,image});
        await product1.save();
        res.send("added!")
    }
    catch(error)
    {
        res.status(500).send("error in adding a new product");
    }
})

productRouter.put("/:id/edit",async(req,res)=>{
    const {name,price,image}=req.body;
    const {id}=req.params;
    try{
        const product=await Product.findById(id);
        if(!product)
        {
            res.status(500).send("No product found")
        }
        product.name=name;
        product.price=price;
        product.image=image;
        await product.save();
        res.send("updated");

    }
    catch(error){
        console.log(error);
        res.status(500).send("Error in editing");
    }
})


productRouter.delete("/:id/delete",async(req,res)=>{

    const {id}=req.params;
    try{
        const product=await Product.findByIdAndDelete(id);
        if(!product)
            return res.status(500).send("No product found")
        res.send("deleted")
    }
    catch(error){
        console.log(error);
        res.status(500).send("error in deleting the product");
    }
})


productRouter.get("/allProducts",async (req,res)=>{
    try{
        const products=await Product.find();
        if(products.length==0)
        {
            res.status(200).send("No Fresh Products Found");
        }
        res.send(products);
    }
    catch(error){
        console.log(error);
        res.status(500).send("error in getting all products");
    }
})

productRouter.get("/:id",async (req,res)=>{
    const {id}=req.params;
    try{
        const product=await Product.findById(id);
        if(product.length!=0)
        res.send(product);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Product Not Found");
    }
})

module.exports={productRouter};