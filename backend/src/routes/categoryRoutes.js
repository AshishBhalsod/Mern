const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {admin} =require("../middlewares/adminMiddleware")
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, admin, createCategory);
router.put('/:id', protect, admin, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;