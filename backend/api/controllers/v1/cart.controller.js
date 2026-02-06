const cartHelpers = require("../../../helpers/cart.helpers");

module.exports = {
  getCart: async (req, res) => {
    try {
      const userId = req.session.user._id;

      const cart = await cartHelpers.getCartDetails(userId);

      res.json({
        success: true,
        cart,
      });
    } catch (error) {
      console.error("getCart error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to load cart",
      });
    }
  },

  addItem: async (req, res) => {
    try {
      const userId = req.session.user._id;
      const productId = req.params.id;

      const result = await cartHelpers.addItem(productId, userId);

      res.json(result);
    } catch (error) {
      if (error?.status === false) {
        return res.status(400).json(error);
      }

      console.error("addItem error:", error);

      res.status(500).json({
        status: false,
        message: "Failed to add item",
      });
    }
  },

  updateItem: async (req, res) => {
    try {
      const result = await cartHelpers.changeCartQuantity(req.body);

      if (!result.status) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      console.error("upateItem error:", error);

      res.status(500).json({
        status: false,
        message: "Failed to update item",
      });
    }
  },

  deleteItem: async (req, res) => {
    try {
      const result = await cartHelpers.deleteCartItem(req.body);

      if (!result.status) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      console.error("deleteItem error:", error);

      res.status(500).json({
        status: false,
        message: "Failed to delete item",
      });
    }
  },
};
