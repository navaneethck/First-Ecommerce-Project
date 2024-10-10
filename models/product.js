const mongoose= require('mongoose');

const ProductSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'category',
    },
    stock: {
        type: Number,
        default: 0
    },
    images: {
        type:[String],
        required:true
    }
 
},{ timestamps:true });

 module.exports = mongoose.model('Product', ProductSchema);



