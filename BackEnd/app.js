const mongoose=require("mongoose");
require('dotenv').config();
const port=process.env.PORT || 5000
const express=require("express");
const app=express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require('cors');
app.use(cors({
    origin: process.env.FRONTEND_URL, // React frontend
    credentials: true
  }));
  
  
app.use(express.json());
const {adminRouter}=require("./Routers/AdminRouter");
const { userRouter } = require("./Routers/UserRouter");
const {productRouter}=require("./Routers/ProductRouter")
const {orderRouter}=require("./Routers/OrdersRouter")

const connectDB = async () => {
    try {
 await mongoose.connect(process.env.MONGOLINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Error in connecting to MongoDB:", error);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Listening on port");
    });
}).catch((error) => {
    console.error("Database connection failed:", error);
});


app.use("/admin",adminRouter);
app.use("/user",userRouter);
app.use("/product",productRouter);
app.use("/order",orderRouter)

