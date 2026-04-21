const express = require('express');
const upload = require('../middlewares/upload');
const { protect } = require('../middlewares/authMiddleware');
const {admin} =require("../middlewares/adminMiddleware")
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, admin, upload.single('image'), createProduct);
router.put('/:id', protect, admin, upload.single('image'), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;