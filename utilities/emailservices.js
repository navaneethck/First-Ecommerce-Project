const nodemailer= require('nodemailer');
require('dotenv').config();

console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS);
const transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },

});

const sendResetEmail= async(to,token)=>{
    const resetLink= `http://localhost:3050/reset-password?token=${token}`
    const mailOptions={
        from: process.env.EMAIL_USER,
        to,
        subject:'password reset',
        text:`click here to reset your password: ${resetLink}`,
    }

    try{
        await transporter.sendMail(mailOptions);
        console.log("Reset mail sent")
    }catch(error){
        console.error("error sending email:",error)
    }
}

module.exports=sendResetEmail;