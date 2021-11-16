const mongoose = require("mongoose");


const CartShema = new mongoose.Schema(
    {
        userId:{type:String, required:true},
        products: [
            {
                productId:{
                    type:String
                },
                quantity:{
                    type:Number,
                    default:1,
                },
            }
        ]

        
    },
    {timestamps:true}
)

module.exports = mongoose.model("Cart", CartShema);