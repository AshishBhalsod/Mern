const Order = require('../models/Order');
const User = require('../models/User');

const placeOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    
    if (user.cart.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    let totalAmount = 0;
    const orderProducts = user.cart.map(item => {
      totalAmount += item.product.price * item.quantity;
      return {
        product: item.product._id,
        quantity: item.quantity
      };
    });

    const order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      totalAmount
    });

    // Clear cart after order
    user.cart = [];
    await user.save();

    res.status(201).json({ success: true, order, message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  const orders = await Order.aggregate([
    { $match: { user: req.user._id } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: 'products',
        localField: 'products.product',
        foreignField: '_id',
        as: 'productDetails'
      }
    }
  ]);
  res.json({ success: true, orders });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'userInfo'
      }
    },
    { $unwind: '$userInfo' },
    {
      $lookup: {
        from: 'products',
        localField: 'products.product',
        foreignField: '_id',
        as: 'productDetails'
      }
    }
  ]);
  res.json({ success: true, orders });
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).populate('user', 'name email mobileNo');

  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, order });
};
const cancelOrder = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) return res.status(404).json({ success: false, message: 'Order not found or not yours' });

  if (order.status === 'Delivered' || order.status === 'Shipped') {
    return res.status(400).json({ success: false, message: 'Cannot cancel delivered or shipped order' });
  }

  order.status = 'Cancelled';
  await order.save();
  res.json({ success: true, message: 'Order cancelled successfully' });
};
const deleteOrder = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, message: 'Order deleted successfully' });
};

module.exports = { placeOrder, getMyOrders, getAllOrders, updateOrderStatus ,cancelOrder,deleteOrder};