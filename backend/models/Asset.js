// models/Asset.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const AssetSchema = new Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  mimeType: String,
  size: Number,

  category: { type: Schema.Types.ObjectId, ref: 'CategoryNode', required: true },
  collection: { type: Schema.Types.ObjectId, ref: 'Collection' },

  language: String,
  tags: [String],
  description: String,
  expiryDate: Date,

  visibility: {
    type: String,
    enum: ['public', 'internal', 'restricted'],
    default: 'internal',
  },

  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Asset', AssetSchema);
