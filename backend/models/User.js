import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  token: String,
  ip: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  sessions: [sessionSchema],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
