import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartQuantity, removeFromCart } from '../redux/slices/cartSlice';
import { Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Refresh cart after quantity change
  useEffect(() => {
    if (loading) {
      dispatch(fetchCart());
    }
  }, [loading, dispatch]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const totalAmount = cart.reduce((total, item) => {
    return total + (item.product?.price || 0) * (item.quantity || 1);
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-4">Your Cart is Empty</h2>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-cyan-500 text-black px-8 py-4 rounded-2xl font-semibold hover:bg-cyan-400"
        >
          <ArrowLeft /> Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.product?._id} className="bg-zinc-900 rounded-3xl p-6 flex gap-6 border border-zinc-800">
              <img
                src={`http://localhost:8000${item.product?.image}`}
                alt={item.product?.name}
                className="w-32 h-32 object-cover rounded-2xl"
              />

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.product?.name}</h3>
                <p className="text-cyan-400 text-lg mt-1">₹{item.product?.price}</p>

                <div className="flex items-center gap-6 mt-6">
                  <div className="flex items-center border border-zinc-700 rounded-2xl">
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                      className="p-3 hover:bg-zinc-800 rounded-l-2xl"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-6 py-3 font-medium min-w-[40px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                      className="p-3 hover:bg-zinc-800 rounded-r-2xl"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="text-red-500 hover:text-red-600 flex items-center gap-2"
                  >
                    <Trash2 size={20} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-zinc-900 rounded-3xl p-8 h-fit border border-zinc-800">
          <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <span className="text-zinc-400">Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Shipping</span>
              <span className="text-green-500">FREE</span>
            </div>
            <hr className="border-zinc-700" />
            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <button className="w-full mt-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-black py-5 rounded-2xl font-bold text-lg">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;