import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  domain: String,
  theme: {
    logo: String,
    color: String,
    font: String
  },
  region: String,
  plan: { type: String, default: 'basic' },
  subscription: {
    type: {
      type: String,
      enum: ['basic', 'pro', 'enterprise'],
      default: 'basic'
    },
    status: {
      type: String,
      enum: ['active', 'trial', 'suspended', 'cancelled'],
      default: 'active'
    },
    startDate: Date,
    endDate: Date,
    trialEndsAt: Date
  },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Tenant', tenantSchema);
