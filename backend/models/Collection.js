// models/Collection.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const CollectionSchema = new Schema({
  title: { type: String, required: true },
  purpose: String,
  includeNotes: String,
  excludeNotes: String,
  visibility: {
    type: String,
    enum: ['public', 'internal', 'restricted'],
    default: 'internal',
  },
  managedBy: String,
  allowedRoles: [{ type: String }],      // ['admin', 'editor']
  allowedFormats: [{ type: String }],    // ['image/png', 'application/pdf']
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Collection', CollectionSchema);
