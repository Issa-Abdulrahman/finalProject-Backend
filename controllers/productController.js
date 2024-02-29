import Product from '../models/productModel.js';
import slugify from 'slugify';
import fs from 'fs'
import mongoose from 'mongoose';
import Category from '../models/categoryModel.js';

// Controller for creating a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, brand } = req.body;

    if (!name || !description || !price || !stock || !category || !brand) {
      if (req.file) {
        const imagePath = `images/${req.file.filename}`
        fs.unlinkSync(imagePath)
      }
      return res.status(400).json({ error: 'all fields are required' })
    }

    if (!mongoose.isValidObjectId(category)) {
      const imagePath = `images/${req.file.filename}`
      fs.unlinkSync(imagePath)
      return res.status(400).json({ error: 'Invalid product id' })
    }

    const categoryy = Category.findById(category)

    if(!categoryy){
      const imagePath = `images/${req.file.filename}`
      fs.unlinkSync(imagePath)
      return res.status(400).json({error : 'No category found'})
    }

    if (!mongoose.isValidObjectId(brand)) {
      const imagePath = `images/${req.file.filename}`
      fs.unlinkSync(imagePath)
      return res.status(400).json({ error: 'Invalid product id' })
    }

    const brandd = Category.findById(brand)

    if(!brandd){
      const imagePath = `images/${req.file.filename}`
      fs.unlinkSync(imagePath)
      return res.status(400).json({error : 'No category found'})
    }

    const image = req.file.filename
    const slug = slugify(name, { lower: true });

    const newProduct = new Product({
      name,
      description,
      price,
      image: image,
      stock,
      slug,
      category
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    const imagePath = `images/${req.file.filename}`
    fs.unlinkSync(imagePath)
    return res.status(400).json({ message: error.message });
  }
};

// Controller for getting all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductsByBrand = async (req, res) => {
  const id = req.body
  try {
    const products = await Product.find({brand : id}).populate('category').sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//controller for getting the latest 4 product
export const getLatestProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category')
      .sort({ createdAt: -1 })
      .limit(4);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single product by ID
export const getProductById = async (req, res) => {
  try {
    const slug = req.params.slug

    if (!slug) {
      return res.status(400).json({ error: 'No slug' })
    }
    const product = await Product.findOne({slug : slug});
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller for updating a product by ID
export const updateProductById = async (req, res) => {
  const id = req.params.id
  const {
    name, description, price, stock, category
  } = req.body
  try {

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid product id' })
    }

    if (!name || !description || !price || !stock || !category) {
      if (req.file) {
        const imagePath = `images/${req.file.filename}`
        fs.unlinkSync(imagePath)
      }
      return res.status(400).json({ error: 'error' })
    }

    const image = req.file.filename

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name, description, price, stock, category, image
    }, { new: true });

    if (!updatedProduct) {
      const imagePath = `images/${req.file.filename}`
      fs.unlinkSync(imagePath)
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    const imagePath = `images/${req.file.filename}`
    fs.unlinkSync(imagePath)
    return res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a product by ID
export const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id 
    if (!id){
      return res.status(400).json({error : "No id "})
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

