import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:8000/api/orders/all', { withCredentials: true });
    setOrders(res.data.orders);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:8000/api/orders/${id}/status`, { status }, { withCredentials: true });
    fetchOrders();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">All Orders</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="bg-zinc-900 p-8 rounded-3xl">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-zinc-400">Order ID: {order._id}</p>
                <p className="font-medium">User: {order.userInfo?.name}</p>
              </div>
              <select 
                value={order.status} 
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="bg-zinc-800 px-6 py-3 rounded-2xl"
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            <p className="mt-6 text-xl">Total: ₹{order.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;