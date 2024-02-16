import Brand from '../models/brandModel.js';

// Controller for creating a new Brand
export const createBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    const savedBrand= await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting all Brands
export const getBrands = async (req, res) => {
  try {
    const Brands = await Brand.find();
    res.status(200).json(Brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single Brand  by ID
export const getBrandById = async (req, res) => {
  try {
    const Brand = await Brand.findById(req.params.id);
    if (!Brand) {
      res.status(404).json({ message: 'Brand not found' });
      return;
    }
    res.status(200).json(Brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a Brand by ID
export const updateBrandById = async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBrand) {
      res.status(404).json({ message: 'Brand not found' });
      return;
    }
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a Brand by ID
export const deleteBrandById = async (req, res) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
      res.status(404).json({ message: 'Brand not found' });
      return;
    }
    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
