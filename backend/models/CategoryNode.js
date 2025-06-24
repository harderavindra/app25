import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategoryNodeSchema = new Schema({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['root', 'category', 'item'],
    required: true
  },
    categoryLabel: { type: String }, // Optional: e.g., "brand", "machineType", etc.

  parent: { type: Schema.Types.ObjectId, ref: 'CategoryNode', default: null },
  path: [{ type: Schema.Types.ObjectId, ref: 'CategoryNode' }],
  description: String,
  collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],

  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Automatically set the path before saving
CategoryNodeSchema.pre('save', async function (next) {
  if (this.parent) {
    const parent = await mongoose.model('CategoryNode').findById(this.parent);
    if (parent) this.path = [...parent.path, parent._id];
  } else {
    this.path = [];
  }
  next();
});

export default mongoose.model('CategoryNode', CategoryNodeSchema);
