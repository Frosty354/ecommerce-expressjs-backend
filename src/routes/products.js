const express = require('express');
const router = express.Router();
const Product = require('../models/products'); 
const jwtMiddleware = require('../middleware/middleware')


// GET all products
router.get('/getAllProducts',jwtMiddleware, async (req, res) => {
    try {
      // Find all products
      const products = await Product.find();
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

router.get('/search',jwtMiddleware, async (req, res) => {
  try {
    const { query } = req.query; // Get the search query from the request query parameters

    // Use Mongoose's $regex to perform a case-insensitive search on multiple fields
    const products = await Product.find({
      $or: [
        { productname: { $regex: new RegExp(query, 'i') } },
        { description: { $regex: new RegExp(query, 'i') } },
        { category: { $regex: new RegExp(query, 'i') } },
        { createdBy: { $regex: new RegExp(query, 'i') } },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/getProduct/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
    
      // Find the product by default mongodb _id
      const product = await Product.findOne({ productId });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


router.post('/createNew',jwtMiddleware, async (req, res) => {
    try {
      const { productname,productId, description, price, category, createdAt,createdBy } = req.body; 
      // Find the user by useremail
      const producte = await Product.findOne({ productId }); 
  
      if (producte) {
        return res.status(400).json({ error: 'Product already exists' });
      }
      const newProduct = new Product({
        productname,
        productId, 
        description, 
        price, 
        category, 
        createdAt,
        createdBy
      });

      await newProduct.save();
  
      // Respond with the token
      res.status(200).json({ message: 'Product registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

// UPDATE product by productId
router.put('/updateProduct/:productId',jwtMiddleware, async (req, res) => {
    try {
      const { productId } = req.params;
      const updateFields = req.body; // Fields to update
      console.log(req.body)
      // Find and update the product by productId
      const updatedProduct = await Product.findOneAndUpdate(
        { productId },
        { $set: updateFields },
        { new: true } // Return the updated document
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


router.delete('/deleteProduct/:productId',jwtMiddleware, async (req, res) => {
    try {
      const { productId } = req.params;
      console.log(productId)
      // Find and delete the product by productId
      const deletedProduct = await Product.findOneAndDelete({ productId });
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });




module.exports = router;