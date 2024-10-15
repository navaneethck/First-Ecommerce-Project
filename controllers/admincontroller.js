
const Product = require('../models/product');
const category = require('../models/category');

//add to category

const AddCategory = async (req,res) =>{
    try{
        const {name}=Object.assign({},req.body); //used object.assign because got object as null prototype
        console.log({name});
       
        // const{name} =req.body;
        const validCategories = ['men','women'];
         if (validCategories.includes(name)){
            const newCategory = new category({
                name,
            });

            await newCategory.save();
            res.redirect('/admincategory');
        }else{
            
            res.redirect('/admincategory?error=Please type exact "men" or "women".');
        }
        
    }catch(error){
        console.log(error.message)
        res.redirect('/admincategory?error=Error adding category');
    }
};


//delete category
const DeleteCategory = async (req,res) =>{
    try{
        const {id} = req.params;
        await category.findByIdAndDelete(id);
        res.redirect('/admincategory');
    }catch(error){
        console.error('error while delete:',error);
        res.status(500).send('Error deleting category');
    }
}






// Create a product




const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock } = req.body;

        if (!req.files || req.files.lemgth===0){
            return res.status(400).json({ message: 'No files Uploaded'});
        }
        const imagePaths = req.files.map(file =>`/images/products/${file.filename}`);
        
        const newProduct = new Product ({
            name,
            price,
            description,
            category,
            stock,
            images: imagePaths
        })
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// // Get all products
// const getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching products', error });
//     }
// };

// // Update a product
// const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
//         if (!updatedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json({ message: 'Product updated successfully', updatedProduct });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating product', error });
//     }
// };

// // Delete a product
// const deleteProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedProduct = await Product.findByIdAndDelete(id);
//         if (!deletedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json({ message: 'Product deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting product', error });
//     }
// };

module.exports = { createProduct,AddCategory,DeleteCategory};
