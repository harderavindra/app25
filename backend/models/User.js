import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  token: String,
  ip: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

const userSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: false }, // 🔑 Multi-tenant link
  firstName: { type: String, required: false },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String,    enum: ['admin', 'designer', 'approver', 'requester', 'viewer'], default: 'viewer' },
  department: String,
  team: String,
  region: String,
  isActive: { type: Boolean, default: true },
  sessions: [sessionSchema],
  lastLogin: Date

}, { timestamps: true });

userSchema.index({ tenantId: 1, email: 1 }, { unique: true });


export default mongoose.model('User', userSchema);
