const user = require("../models/user");
const bcrypt = require ('bcrypt');
const {hashpassword} = require("../utilities/passwordutilities.js");
const jwt=require('jsonwebtoken');
const sendResetEmail= require('../utilities/emailservices')

// for signup
const register = async (req, res) => {
  
  console.log(req.body.email)
  const Email = req.body.email;
  const finduser = await user.findOne({ email: Email });

  if (!finduser) {
    try {
      const password=req.body.password;
      const confpassword=req.body.confirmpassword;
      if(password==confpassword){
      console.log(password)
      const hashedpassword = await hashpassword(req.body.password);

      
      const newuser = await user.create({
        email: req.body.email,
        password: hashedpassword
      });
       req.session.user=newuser;
    
      // await newuser.save();
      // res.json({
      //   message: "User successfully registered",
      //   success: true,
      //   user: newuser
      // });
      res.redirect('/')
    }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Error registering user",
        success: false,
      });
    }
  } else {
    res.json({
      message: "already existed",
      success: false,
    });
  }
};



//for login
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body.email)
  console.log(req.body.password)
  try{
  const finduser = await user.findOne({ email: email});
  console.log(finduser)
  if (finduser) {
     
  const match=await bcrypt.compare(password,finduser.password); 
  if(finduser.isadmin){
    return res.status(200).redirect('/adminhome');
  }
     if(match){ 
      req.session.user = finduser
      return res.redirect('/')
      // res.json({
      //   message: "successfullylogined",
      //   success: true,

      // });
    
  } else {
    res.json({
      message: "invalid email or password",
      success: false,
    });
  }
}else {
  res.json({
    message: "invalid email or password",
    success: false,
  });
}
}catch (error) {
    console.error("Error during login:",error)
}
}


//forgottpassword
  const forgottpassword= async(req,res)=>{
    const{ email }=req.body;
      try{
        const finduser=await user.findOne({email});
          if(!finduser){
            
            return res.json({message:"user not found",success:false})
          }
               const token=jwt.sign({id:finduser._id},process.env.JWT_SECRET,{expiresIn:'30 min'});

               await sendResetEmail(finduser.email,token);

                   res.json({message:"password reset email sent",success:true})
      }catch(error){
              console.error("Error during forgot password process:", error);
              
                 res.status(500).json({message:"Error sending mail",success:false}) 
            }

      };




   //resetpassword
   const resetpassword=async(req,res)=>{
    const{token}=req.query;
    const {newPassword,confirmPassword}=req.body;

    try{
      const decoded=jwt.verify(token,process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);
      const finduser=await user.findById(decoded.id);

      if(!finduser){
        return res.status(404).json({ message: "User not found", success: false });
      }

      if(newPassword==confirmPassword){
        const hasedpassword= await hashpassword(newPassword);
        finduser.password=hasedpassword;
        await finduser.save();
        return res.status(200).json({message:"password updated successfully",success:true})
      }else{
        return res.status(400).json({message:"password do not match",success:false})
      }

    }catch(error){
      console.error("Error during password reset:", error.message);
      return res.status(400).json({message:"Invalid or expired token",success:false});
    }
   };





module.exports = { register, login,forgottpassword,resetpassword }
