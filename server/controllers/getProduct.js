const Product = require("../models/Product");


exports.getProduct = async(req,res)=>{
    try{
        const product = await Product.find({});

        console.log("Product", Product);

        if(!Product){
            res.status(401).json({
                success:false,
                message:"No Product"
            })
        }

        res.status(200).json({
            success:true,
            message:"all product get successfully",
            data:product
        })
    }catch(error){
        console.error("Error while getting product", error);
        res.status(500).json({
            success:false,
            message:"Problem while getting Product"
        })
    }
}