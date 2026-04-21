const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Security
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Static files for images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Default Admin Creation
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const createDefaultAdmin = async () => {
  try {
    const exists = await User.findOne({ email: 'admin@gmail.com' });
    if (!exists) {
      // const hashed = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Super Admin',
        email: 'admin@gmail.com',
        mobileNo: '9876543210',
        password: "admin123",
        role: 'admin'
      });
      console.log('✅ Default Admin Created: admin@gmail.com / admin123');
    }
  } catch (err) {
    console.error('Default admin error:', err);
  }
};

setTimeout(createDefaultAdmin, 2000);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});