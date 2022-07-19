const mongoose = require("mongoose");
const date = new Date().getTime();
const categorySchema = new mongoose.Schema({
   
    categoryName:{type:String,required:true},
    categoryDescription:{type:String,required:true},
    categoryImage:{type:String,required:true},
    createdAt:{type:String,default:date},
    updatedAt:{type:Number},
    isActive:{type:Boolean}
    

})

const userModel = mongoose.model("categoryname",categorySchema)

module.exports = userModel;