import Category from '../models/CategorySchema.js';

// Controller for creating a new subcategory
export const createSubcategory = async (req, res) => {
  try {
    const newSubcategory = new Category(req.body);
    const savedSubcategory = await newSubcategory.save();
    res.status(201).json(savedSubcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting all subcategories
export const getSubcategories = async (req, res) => {
  try {
    const subcategories = await Category.find();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single subcategory by ID
export const getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Category.findById(req.params.id);
    if (!subcategory) {
      res.status(404).json({ message: 'Subcategory not found' });
      return;
    }
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a subcategory by ID
export const updateSubcategoryById = async (req, res) => {
  try {
    const updatedSubcategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSubcategory) {
      res.status(404).json({ message: 'Subcategory not found' });
      return;
    }
    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a subcategory by ID
export const deleteSubcategoryById = async (req, res) => {
  try {
    const deletedSubcategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedSubcategory) {
      res.status(404).json({ message: 'Subcategory not found' });
      return;
    }
    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
