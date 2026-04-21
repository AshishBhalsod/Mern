import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { ShoppingCart, Star } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId }));
  };

  if (loading) {
    return <div className="text-center py-20 text-2xl">Loading products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Discover Amazing Products
        </h1>
        <p className="text-zinc-400 text-xl">Shop the best products at unbeatable prices</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="product-card bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 group">
            <div className="relative h-64 overflow-hidden">
              <img
                src={`http://localhost:8000${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm">
                ₹{product.price}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-2xl font-medium transition-all active:scale-95"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;