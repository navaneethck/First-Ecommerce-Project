const express=require('express')
const router=express.Router();

const {home,women,cart,categorie,checkout,contact,profile,}=require('../controllers/render');

router.get('/',home)
router.get('/product',women)
router.get('/cart',cart)
router.get('/categorie',categorie)
router.get('/checkout',checkout)
router.get('/contact',contact)
router.get('/profile',profile)


  


module.exports=router;
