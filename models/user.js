const mongoose=require("mongoose");
const schema=mongoose.Schema;
const  crypto=require('crypto');


const userSchema=new schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isadmin:{type:Boolean,default:false}

})







module.exports = mongoose.model('User', userSchema);
