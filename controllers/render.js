const Product = require ('../models/product')


const home= async (req,res)=>{
    try{
        const products = await Product.find();
        res.render('user/index',{
            user:req.session.user,
            products:products});

    }catch(error){
    console.error('Error fetching products:',error);
    res.status(500).send('Error fetching products')
}
};

const women=(req,res)=>{
    res.render('user/product');
}
const cart=(req,res)=>{
    res.render('user/cart');
}
const categorie=(req,res)=>{
    res.render('user/categorie');
}
const checkout=(req,res)=>{
    res.render('user/checkout');
}
const contact=(req,res)=>{
    res.render('user/contact');
}
const profile=(req,res)=>{
    res.render('user/userlogin');
}





module.exports={home,women,cart,categorie,checkout,contact,profile};
