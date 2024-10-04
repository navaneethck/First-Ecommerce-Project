const Product = require('../models/product');
const category=require('../models/category');

const adminhome=(req,res)=>{
    res.render('admin/adminhome');
}


//render the category page
const AdminCategory = async (req,res) =>{
    try {
        const categories = await category.find();
        res.render('admin/admin-categories',{categories});
    }catch(error){
        console.error('Error when fetching categories:',error);
        res.status(500).send('Error when fetching categories ');
    }
}


//Renders the admin products page
const AdminProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from MongoDB
        res.render('admin/admin-products',{products});  // Pass products to EJS
    } catch (error) {
        console.error('Error when fetching products:', error);
        res.status(500).send('Error when fetching products');
    }
};



module.exports={adminhome,AdminProducts,AdminCategory};