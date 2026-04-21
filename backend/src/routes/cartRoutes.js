const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getCart, addToCart, updateCartQuantity, removeFromCart } = require('../controllers/cartController');

const router = express.Router();

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.put('/update', protect, updateCartQuantity);
router.delete('/remove/:productId', protect, removeFromCart);

module.exports = router;