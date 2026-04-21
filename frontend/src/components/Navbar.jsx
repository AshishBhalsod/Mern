import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import { ShoppingCart, User, LogOut, Shield } from 'lucide-react';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <span className="text-cyan-400">SHOP</span>
          <span className="text-white">CART</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          
          {user && (
            <>
              <Link to="/cart" className="flex items-center gap-2 hover:text-cyan-400 transition-colors relative">
                <ShoppingCart size={22} />
                {cart?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
                Cart
              </Link>

              {user.role === 'admin' && (
                <Link to="/admin" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Shield size={20} />
                  Admin
                </Link>
              )}
            </>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {user.profilePic ? (
                  <img src={`http://localhost:8000${user.profilePic}`} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <div className="w-9 h-9 bg-zinc-700 rounded-full flex items-center justify-center">
                    <User size={20} />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-zinc-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-cyan-400 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;