const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const categorySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    path:{
        type:String,
    },
   
}); 
const Category=mongoose.model("Category",categorySchema);
module.exports=Category;

