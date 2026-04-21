import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const getProductId = (item) => {
  if (!item?.product) return null;
  return typeof item.product === 'object' ? item.product._id : item.product;
};

// Get Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const res = await axios.get(`${API_URL}/cart`, { withCredentials: true });
  return res.data.cart;
});

// Add to Cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity = 1 }) => {
  const res = await axios.post(`${API_URL}/cart/add`, { productId, quantity }, { withCredentials: true });
  return res.data;
});

// Update Quantity
export const updateCartQuantity = createAsyncThunk('cart/updateQuantity', async ({ productId, quantity }) => {
  const res = await axios.put(`${API_URL}/cart/update`, { productId, quantity }, { withCredentials: true });
 
  return res.data;
});

// Remove from Cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId) => {
  await axios.delete(`${API_URL}/cart/remove/${productId}`, { withCredentials: true });
  return productId;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => { state.cart = action.payload; })
      .addCase(addToCart.fulfilled, (state, action) => { state.cart = action.payload.cart || state.cart; })
      .addCase(updateCartQuantity.fulfilled, (state, action) => { state.cart = action.payload.cart || state.cart; })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter(item => getProductId(item) !== action.payload);
      });
  }
});
// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: { cart: [], loading: false },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.cart = action.payload;
//       })
//       .addCase(addToCart.fulfilled, (state) => {
//         // Refresh cart after add
//         state.loading = true;
//       })
//       .addCase(updateCartQuantity.fulfilled, (state) => {
//         // Refresh cart to keep full product details
//         state.loading = true;
//       })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.cart = state.cart.filter(item => item.product._id !== action.payload);
//       });
//   }
// });

export default cartSlice.reducer;