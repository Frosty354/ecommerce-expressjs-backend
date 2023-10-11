const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
    
    productname: {
        type: String,
        required: true,
        trim: true, // Remove extra white spaces from the beginning and end
    },
    productId:{
        type:String,
        
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Minimum price should be 0 or greater
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    imageUrl: String, // Optional field for product image URL
    createdAt: {
        type: Date,
        default: Date.now, // Default value is the current date and time
    },
});

// Create a Product model using the schema
const Product = mongoose.model('Product', productSchema,'productdb');

module.exports = Product;
