// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../../redux/slices/productSlice';
// import axios from 'axios';

// const AdminProducts = () => {
//   const dispatch = useDispatch();
//   const { products } = useSelector((state) => state.products);
//   const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', category: '' });
//   const [image, setImage] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.keys(form).forEach(key => formData.append(key, form[key]));
//     if (image) formData.append('image', image);

//     if (editingId) {
//       await axios.put(`http://localhost:8000/api/products/${editingId}`, formData, { withCredentials: true });
//     } else {
//       await axios.post('http://localhost:8000/api/products', formData, { withCredentials: true });
//     }

//     dispatch(fetchProducts());
//     setForm({ name: '', description: '', price: '', stock: '', category: '' });
//     setImage(null);
//     setEditingId(null);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Delete this product?')) {
//       await axios.delete(`http://localhost:8000/api/products/${id}`, { withCredentials: true });
//       dispatch(fetchProducts());
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12">
//       <h1 className="text-4xl font-bold mb-8">Manage Products</h1>

//       <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-3xl mb-12 grid grid-cols-2 gap-6">
//         <input placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl" required />
//         <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl" required />
//         <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl" required />
//         <input placeholder="Category ID" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl" required />
//         <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl col-span-2" rows="3" />
//         <input type="file" onChange={e => setImage(e.target.files[0])} className="col-span-2" />
//         <button type="submit" className="col-span-2 bg-cyan-500 text-black py-4 rounded-2xl font-bold">
//           {editingId ? 'Update Product' : 'Add Product'}
//         </button>
//       </form>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map(product => (
//           <div key={product._id} className="bg-zinc-900 rounded-3xl p-6">
//             <img src={`http://localhost:8000${product.image}`} className="w-full h-48 object-cover rounded-2xl" />
//             <h3 className="font-semibold mt-4">{product.name}</h3>
//             <p className="text-cyan-400">₹{product.price}</p>
//             <div className="flex gap-3 mt-6">
//               <button onClick={() => { setEditingId(product._id); setForm(product); }} className="flex-1 bg-zinc-800 py-3 rounded-2xl">Edit</button>
//               <button onClick={() => handleDelete(product._id)} className="flex-1 bg-red-600 py-3 rounded-2xl">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminProducts;


import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import axios from 'axios';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', category: '' });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    fetchCategories();
  }, [dispatch]);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:8000/api/categories');
    setCategories(res.data.categories || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (image) formData.append('image', image);

    if (editingId) {
      await axios.put(`http://localhost:8000/api/products/${editingId}`, formData, { withCredentials: true });
    } else {
      await axios.post('http://localhost:8000/api/products', formData, { withCredentials: true });
    }

    dispatch(fetchProducts());
    resetForm();
  };

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', stock: '', category: '' });
    setImage(null);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await axios.delete(`http://localhost:8000/api/products/${id}`, { withCredentials: true });
      dispatch(fetchProducts());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Manage Products</h1>

      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-3xl mb-12 grid grid-cols-2 gap-6">
        <input placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl" required />
        <input type="number" placeholder="Price (₹)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl" required />
        <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl" required />
        
        {/* Category Dropdown */}
        <select 
          value={form.category} 
          onChange={e => setForm({...form, category: e.target.value})}
          className="bg-zinc-800 p-4 rounded-2xl"
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea 
          placeholder="Description" 
          value={form.description} 
          onChange={e => setForm({...form, description: e.target.value})} 
          className="bg-zinc-800 p-4 rounded-2xl col-span-2" 
          rows="3" 
        />

        <input type="file" onChange={e => setImage(e.target.files[0])} className="col-span-2 bg-zinc-800 p-4 rounded-2xl" />

        <button type="submit" className="col-span-2 bg-cyan-500 text-black py-4 rounded-2xl font-bold text-lg">
          {editingId ? 'Update Product' : 'Add New Product'}
        </button>
      </form>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="bg-zinc-900 rounded-3xl overflow-hidden">
            <img src={`http://localhost:8000${product.image}`} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-cyan-400">₹{product.price}</p>
              <p className="text-sm text-zinc-400 mt-1">Stock: {product.stock}</p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => { setEditingId(product._id); setForm(product); }} className="flex-1 bg-zinc-800 py-3 rounded-2xl">Edit</button>
                <button onClick={() => handleDelete(product._id)} className="flex-1 bg-red-600 py-3 rounded-2xl">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;