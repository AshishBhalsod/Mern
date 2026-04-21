import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:8000/api/admin/users', { withCredentials: true });
    setUsers(res.data.users);
  };

  const changeRole = async (id, role) => {
    await axios.put(`http://localhost:8000/api/admin/users/${id}/role`, { role }, { withCredentials: true });
    fetchUsers();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Manage Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map(user => (
          <div key={user._id} className="bg-zinc-900 p-8 rounded-3xl flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-zinc-400">{user.email}</p>
              <p className="text-sm">Role: <span className="font-medium text-cyan-400">{user.role}</span></p>
            </div>
            <button 
              onClick={() => changeRole(user._id, user.role === 'admin' ? 'user' : 'admin')}
              className="px-6 py-3 bg-zinc-800 rounded-2xl hover:bg-cyan-500 hover:text-black transition-all"
            >
              Make {user.role === 'admin' ? 'User' : 'Admin'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;