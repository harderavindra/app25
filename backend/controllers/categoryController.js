// ------------------ CONTROLLERS ------------------
// controllers/categoryController.js
import CategoryNode from '../models/CategoryNode.js';

export const createCategoryNode = async (req, res) => {
  try {
    const tenantFilter = req.tenantFilter || {}; // should be like { tenantId: 'xyz' }
    const { name, type, categoryLabel, parent, description } = req.body;

    const node = new CategoryNode({
      name,
      type,
      categoryLabel,
      parent: parent || null,
      description,
      ...tenantFilter, // Correct: spread into the root level
    });

    console.log("node before ", node);

    await node.save();

    console.log("node after", node);
    res.status(201).json({ message: 'Category created', node });
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const listCategoryTree = async (req, res) => {
  try {
        const tenantFilter = req.tenantFilter; // Provided by enforceTenant()


    const allNodes = await CategoryNode.find(tenantFilter).lean();

    // Map nodes by _id
    const nodeMap = {};
    allNodes.forEach(node => {
      node.children = [];
      nodeMap[node._id] = node;
    });

    // Build tree
    const tree = [];
    allNodes.forEach(node => {
      if (node.parent) {
        nodeMap[node.parent]?.children.push(node);
      } else {
        tree.push(node);
      }
    });

    res.json(tree);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCategoryNode = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, categoryLabel, parent, description } = req.body;

    const updated = await CategoryNode.findByIdAndUpdate(
      id,
      { name, type, categoryLabel, parent: parent || null, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category updated', node: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete category
export const deleteCategoryNode = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id',id)

    // Optional: Check if node has children and prevent deletion
    const hasChildren = await CategoryNode.exists({ parent: id });
    if (hasChildren) {
      return res.status(400).json({ error: 'Cannot delete: node has children' });
    }

    await CategoryNode.findByIdAndDelete(id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const assignCollectionsToCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { collectionIds } = req.body; // Array of collection ObjectIds

    const updated = await CategoryNode.findByIdAndUpdate(id, {
      $set: { collections: collectionIds },
    }, { new: true });

    res.json(updated);
  } catch (err) {
    console.error('Assign collections failed:', err);
    res.status(500).json({ message: 'Failed to assign collections' });
  }
};