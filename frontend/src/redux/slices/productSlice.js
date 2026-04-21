import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data.products;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { products: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => { state.loading = false; });
  }
});

export default productSlice.reducer;