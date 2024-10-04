
const express=require('express');
const router=express.Router();
const multer = require('multer');
const path = require('path');


const{adminhome,AdminProducts,AdminCategory }=require('../controllers/admin_render')
const { createProduct,AddCategory,DeleteCategory } = require('../controllers/admincontroller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/products');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid file overwrites
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB size limit
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    }
});

router.get('/adminhome',adminhome);
router.get('/admincategory',AdminCategory)
router.get('/adminproducts',AdminProducts);
   
//post request for add category
router.post('/category/AddCategory',AddCategory);

//post request for delete category
router.post('/category/DeleteCategory/:id',DeleteCategory);


// API routes for product management
router.post('/products/createproduct', upload.array('images',5),createProduct);  // Create a product
// router.get('/products', getAllProducts);         // Get all products (API)
// router.put('/products/:id', updateProduct);      // Update a product
// router.delete('/products/:id', deleteProduct);   // Delete a product


module.exports = router;