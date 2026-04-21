const Product = require('../models/Product');
const path = require('path');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const product = await Product.create({
      name, description, price, stock, category, image
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getProducts = async (req, res) => {
  const products = await Product.find().populate('category', 'name');
  res.json({ success: true, products });
};

const updateProduct = async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate('category');
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  res.json({ success: true, product });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, message: 'Product deleted successfully' });
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };