const express=require('express');
const router=express.Router();

const{adminhome}=require('../controllers/admin_render')

router.get('/adminhome',adminhome);






module.exports=router;