import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:8000/api/categories');
    setCategories(res.data.categories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/categories', { name, description }, { withCredentials: true });
    fetchCategories();
    setName('');
    setDescription('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete category?')) {
      await axios.delete(`http://localhost:8000/api/categories/${id}`, { withCredentials: true });
      fetchCategories();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Manage Categories</h1>

      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-3xl mb-12">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Category Name" className="w-full p-4 bg-zinc-800 rounded-2xl mb-4" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full p-4 bg-zinc-800 rounded-2xl" rows="3" />
        <button type="submit" className="mt-6 w-full bg-cyan-500 text-black py-4 rounded-2xl font-bold">Add Category</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat._id} className="bg-zinc-900 p-6 rounded-3xl flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{cat.name}</h3>
              <p className="text-sm text-zinc-400">{cat.description}</p>
            </div>
            <button onClick={() => handleDelete(cat._id)} className="text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;