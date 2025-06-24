import Collection from '../models/Collection.js';

// Create new collection
export const createCollection = async (req, res) => {
  try {
    const collection = new Collection({
      ...req.body,
      createdBy: req.user._id, // Assumes auth middleware
    });
    await collection.save();
    res.status(201).json(collection);
  } catch (err) {
    console.error('Create collection failed:', err);
    res.status(500).json({ message: 'Failed to create collection' });
  }
};

// List all collections
export const listCollections = async (req, res) => {
  try {
    const collections = await Collection.find().sort({ createdAt: -1 });
    res.json(collections);
  } catch (err) {
    console.error('List collections failed:', err);
    res.status(500).json({ message: 'Failed to fetch collections' });
  }
};
