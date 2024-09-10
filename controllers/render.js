const home=(req,res)=>{
    res.render('user/index',{user:req.session.user});
}
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
