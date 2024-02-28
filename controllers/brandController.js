import Brand from '../models/brandModel.js';
import mongoose from 'mongoose';
import fs from 'fs';
import slugify from 'slugify';
import Category from '../models/categoryModel.js';

// Controller for creating a new Brand
export const createBrand = async (req, res) => {
  try {
    const { name, categoryID } = req.body;

    if (!name || !categoryID) {
      if (req.file) {
        const imagePath = `images/${req.file.filename}`;
        fs.unlinkSync(imagePath);
      }
      return res.status(400).json({ error: 'Name and categoryID are required' });
    }

    if (!mongoose.isValidObjectId(categoryID)) {
      if (req.file) {
        const imagePath = `images/${req.file.filename}`;
        fs.unlinkSync(imagePath);
      }
      return res.status(400).json({ error: 'Invalid categoryID' });
    }

    const category = await Category.findById(categoryID);
    if (!category) {
      if (req.file) {
        const imagePath = `images/${req.file.filename}`;
        fs.unlinkSync(imagePath);
      }
      return res.status(400).json({ error: 'Category not found' });
    }

    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      if (req.file) {
        const imagePath = `images/${req.file.filename}`;
        fs.unlinkSync(imagePath);
      }
      return res.status(400).json({ error: 'Brand with the same name already exists' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const image = req.file.filename;
    const slug = slugify(name, { lower: true });

    const newBrand = new Brand({
      name,
      image,
      categoryID,
      slug,
    });

    const savedBrand = await newBrand.save();
    return res.status(201).json(savedBrand);
  } catch (error) {
    if (req.file) {
      const imagePath = `images/${req.file.filename}`;
      fs.unlinkSync(imagePath);
    }
    return res.status(400).json({ message: error.message });
  }
};

// Controller for getting all Brands
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    return res.status(200).json(brands);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single Brand by ID
export const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid Brand ID' });
    }

    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    return res.status(200).json(brand);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller for updating a Brand by ID
export const updateBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryID } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid Brand ID' });
    }

    if (!name || !categoryID) {
      return res.status(400).json({ error: 'Name and categoryID are required' });
    }

    const existingBrand = await Brand.findById(id);
    if (!existingBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    existingBrand.name = name;
    existingBrand.categoryID = categoryID;

    const updatedBrand = await existingBrand.save();
    return res.status(200).json(updatedBrand);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a Brand by ID
export const deleteBrandById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid Brand ID' });
    }

    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    return res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};