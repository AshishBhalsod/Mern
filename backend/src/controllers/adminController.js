const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ success: true, users });
};
const changeUserRole = async (req, res) => {
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role' });
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, message: `Role changed to ${role}`, user });
};
const getUserCart = async (req, res) => {
  const user = await User.findById(req.params.userId)
    .populate('cart.product', 'name price image category');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, cart: user.cart, user: { name: user.name, email: user.email } });
};

module.exports = { getAllUsers, changeUserRole,getUserCart };