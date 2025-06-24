import CategoryNode from "../models/CategoryNode.js";
import Collection from "../models/Collection.js";

// Create a Category Node
export const createCategoryNode = async (req, res) => {
    try {
        const { name, type, parent, description } = req.body;
        const node = new CategoryNode({ name, type,   parent: parent || null, description });
        console.log("Creating category node with data:", node);
        await node.save();
        console.log("Category node created:", node);
        res.status(201).json({ message: "Category node created", node });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Category Nodes (with tree optional)
export const getCategoryNodes = async (req, res) => {
    try {
        const nodes = await CategoryNode.find().populate("parent", "name");
        res.json(nodes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a Collection under a Node
export const createCollection = async (req, res) => {
    try {
        const { title, hierarchyNode, purpose, includeNotes, excludeNotes, managedBy, visibility, allowedRoles } = req.body;
        const collection = new Collection({ title, hierarchyNode, purpose, includeNotes, excludeNotes, managedBy, visibility, allowedRoles });
        await collection.save();
        res.status(201).json({ message: "Collection created", collection });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// List collections with optional filtering by node
export const getCollections = async (req, res) => {
    try {
        const { nodeId } = req.query;
        const filter = nodeId ? { hierarchyNode: nodeId } : {};
        const collections = await Collection.find(filter).populate("hierarchyNode", "name");
        res.json(collections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCategoryTree = async (req, res) => {
  try {
    const nodes = await CategoryNode.find({}).lean();

    // Build a map of _id => node
    const map = {};
    nodes.forEach(n => {
      n.children = [];
      map[n._id] = n;
    });

    // Organize tree
    const tree = [];
    nodes.forEach(n => {
      if (n.parent) {
        map[n.parent]?.children.push(n);
      } else {
        tree.push(n);
      }
    });

    res.json(tree);
  } catch (err) {
    console.error("Tree fetch error:", err);
    res.status(500).json({ error: err.message });
  }
};