const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {admin} =require("../middlewares/adminMiddleware")
const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus,cancelOrder,deleteOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/all', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.put('/:id/cancel', protect, cancelOrder);        // User can cancel
router.delete('/:id', protect, admin, deleteOrder);     // Admin can delete
module.exports = router;