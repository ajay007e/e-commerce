const categoryHelpers = require("../../../helpers/categories.helper");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const result = await categoryHelpers.createCategory(req.body);
      if (!result.status) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error) {
      console.error("createCategory error:", error);
      res.status(500).json({
        status: false,
        message: "Failed to create category",
      });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const result = await categoryHelpers.updateCategory(
        req.params.id,
        req.body,
      );
      if (!result.status) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error) {
      console.error("updateCategory error:", error);
      res.status(500).json({
        status: false,
        message: "Failed to update category",
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const result = await categoryHelpers.deleteCategory(req.params.id);
      if (!result.status) {
        return res.status(400).json(result);
      }
      res.json(result);
    } catch (error) {
      console.error("deleteCategory error:", error);
      res.status(500).json({
        status: false,
        message: "Failed to delete category",
      });
    }
  },
  getCategories: async (req, res) => {
    try {
      const categories = await categoryHelpers.getCategories();
      res.json({
        status: true,
        categories,
      });
    } catch (error) {
      console.error("getCategories error:", error);
      res.status(500).json({
        status: false,
        message: "Failed to load categories",
      });
    }
  },
  getCategory: async (req, res) => {
    try {
      const category = await categoryHelpers.getCategory(req.params.id);
      if (!category) {
        return res.status(404).json({
          status: false,
          message: "Category not found",
        });
      }
      res.json({
        status: true,
        category,
      });
    } catch (error) {
      console.error("getCategory error:", error);
      res.status(500).json({
        status: false,
        message: "Failed to load category",
      });
    }
  },
};
