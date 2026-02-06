const helpers = require("../../helpers/config.helpers");
const ObjectId = require("mongodb").ObjectId;

exports.updateHeroSectionConfig = async (req, res) => {
  try {
    const config = JSON.parse(req.body.config);
    console.log(config);
    res.json({
      success: true,
      config,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getHeroSectionConfig = async (req, res) => {
  try {
    const config = await helpers.getConfig("hero");
    console.log(config);
    res.json({
      success: true,
      config,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, slug, parentId, isActive = true } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category = {
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      parentId: parentId ? new ObjectId(parentId) : null,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await helpers.createCategory(category);

    res.json({
      success: true,
      message: "Category created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Update category
 */
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.parentId) {
      updates.parentId = new ObjectId(updates.parentId);
    }

    updates.updatedAt = new Date();

    await helpers.updateCategory(id, updates);

    res.json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Get categories (tree structure)
 */
exports.getCategories = async (req, res) => {
  try {
    const categories = await helpers.getAllCategories();

    const buildTree = (parentId = null) =>
      categories
        .filter((cat) =>
          parentId === null
            ? cat.parentId === null
            : cat.parentId?.toString() === parentId.toString(),
        )
        .map((cat) => ({
          ...cat,
          children: buildTree(cat._id),
        }));

    res.json({
      success: true,
      categories: buildTree(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Get single category
 */
exports.getCategoryById = async (req, res) => {
  try {
    const category = await helpers.getCategoryById(req.params.id);

    res.json({
      success: true,
      category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getSizes = async (req, res) => {
  try {
    const sizes = await helpers.getSizes();

    res.json({
      success: true,
      sizes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Create size
 */
exports.createSize = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Size name is required",
      });
    }

    await helpers.createSize({
      name: name.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.json({
      success: true,
      message: "Size created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Update size
 */
exports.updateSize = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Size name is required",
      });
    }

    await helpers.updateSize(id, {
      name: name.trim(),
      updatedAt: new Date(),
    });

    res.json({
      success: true,
      message: "Size updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
