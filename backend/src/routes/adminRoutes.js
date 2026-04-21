const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {admin} =require("../middlewares/adminMiddleware")
const { getAllUsers, changeUserRole,getUserCart } = require('../controllers/adminController');

const router = express.Router();

router.get('/users', protect, admin, getAllUsers);
router.put('/users/:id/role', protect, admin, changeUserRole);
router.get('/users/:userId/cart', protect, admin, getUserCart);
module.exports = router;