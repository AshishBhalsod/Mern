import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Package, Users, ShoppingCart, FolderTree } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">Admin Dashboard</h1>
        <p className="text-zinc-400 text-xl mt-2">Welcome back, {user?.name} 👋</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/admin/products" className="bg-zinc-900 p-8 rounded-3xl border border-zinc-700 hover:border-cyan-400 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-cyan-400 text-sm font-medium">PRODUCTS</p>
              <h3 className="text-4xl font-bold mt-2">Manage Products</h3>
            </div>
            <Package size={48} className="text-cyan-400 group-hover:scale-110 transition" />
          </div>
        </Link>

        <Link to="/admin/categories" className="bg-zinc-900 p-8 rounded-3xl border border-zinc-700 hover:border-cyan-400 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-cyan-400 text-sm font-medium">CATEGORIES</p>
              <h3 className="text-4xl font-bold mt-2">Manage Categories</h3>
            </div>
            <FolderTree size={48} className="text-cyan-400 group-hover:scale-110 transition" />
          </div>
        </Link>

        <Link to="/admin/orders" className="bg-zinc-900 p-8 rounded-3xl border border-zinc-700 hover:border-cyan-400 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-cyan-400 text-sm font-medium">ORDERS</p>
              <h3 className="text-4xl font-bold mt-2">View All Orders</h3>
            </div>
            <ShoppingCart size={48} className="text-cyan-400 group-hover:scale-110 transition" />
          </div>
        </Link>

        <Link to="/admin/users" className="bg-zinc-900 p-8 rounded-3xl border border-zinc-700 hover:border-cyan-400 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-cyan-400 text-sm font-medium">USERS</p>
              <h3 className="text-4xl font-bold mt-2">Manage Users</h3>
            </div>
            <Users size={48} className="text-cyan-400 group-hover:scale-110 transition" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;