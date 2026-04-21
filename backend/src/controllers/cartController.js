const User = require('../models/User');
const Product = require('../models/Product');

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    res.json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const existingItem = user.cart.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json({ success: true, message: 'Added to cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const item = user.cart.find(item => item.product.toString() === productId);

    if (!item) return res.status(404).json({ success: false, message: 'Item not in cart' });

    item.quantity = quantity;
    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    await user.save();
    res.json({ success: true, message: 'Item removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCart, addToCart, updateCartQuantity, removeFromCart };