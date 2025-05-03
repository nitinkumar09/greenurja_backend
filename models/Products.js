const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:[{
        type:String,
        required:true
}],
    dealOfTheDay:{
        type:Boolean,
        default:false
    },
    newArrival:{
        type:Boolean,
        default:false
    },
    price:{
        type:Number,
        required:true
    },
    
    gst:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    specifications:{
        type:[

            
            {
                heading :{
                    type:String,
                    required:true
                },
                attributes:[{
                key:{
                    type:String,
                    required:true
                },
                value:{
                    type:String,
                    required:true
                }}]
            }
        ],
    
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    description:{
        type:String,
        required:true
    },
        
    stock:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    

});
const Product=mongoose.model("Product",productSchema);
module.exports=Product;