import mongoose from 'mongoose';
import { seedDefaultTenantAndAdmin } from '../utils/seed.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    await seedDefaultTenantAndAdmin(); // 🧪 Run safe seed
  } catch (err) {
    console.error('MongoDB error:', err.message);
    process.exit(1);
  }
};