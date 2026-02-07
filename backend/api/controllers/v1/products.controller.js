const productHelper = require("../../../helpers/product.helpers");

module.exports = {
  /* ================= Create ================= */

  createProduct: (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    const data = JSON.parse(req.body.data || "{}");

    productHelper
      .createProduct(data, req.files)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          status: false,
          message: "Server error",
        });
      });
  },

  /* ================= Update ================= */

  updateProduct: (req, res) => {
    const data = JSON.parse(req.body.data || "{}");

    const removed = req.body.removedImages
      ? JSON.parse(req.body.removedImages)
      : [];

    productHelper
      .updateProduct(req.params.id, data, req.files, removed)
      .then((response) => {
        res.json(response);
      })
      .catch(() => {
        res.status(500).json({
          status: false,
          message: "Server error",
        });
      });
  },

  /* ================= Delete ================= */

  deleteProduct: (req, res) => {
    productHelper
      .deleteProduct(req.params.id)
      .then((response) => {
        res.json(response);
      })
      .catch(() => {
        res.status(500).json({
          status: false,
          message: "Server error",
        });
      });
  },

  /* ================= Public ================= */

  getProducts: (req, res) => {
    productHelper
      .getProducts(req.query)
      .then((response) => {
        res.json(response);
      })
      .catch(() => {
        res.status(500).json({
          status: false,
          message: "Server error",
        });
      });
  },

  getProduct: (req, res) => {
    productHelper
      .getProduct(req.params.id)
      .then((response) => {
        res.json(response);
      })
      .catch(() => {
        res.status(500).json({
          status: false,
          message: "Server error",
        });
      });
  },
  getProductReviews: (req, res) => {
    productHelper
      .getProductReviews(req.params.id)
      .then((response) => {
        res.json(response);
      })
      .catch(() => {
        res.status(500).json({
          status: false,
          message: "Server error",
        });
      });
  },

  createProductReview: (req, res) => {
    productHelper
      .createProductReview(req.params.id, req.body, req.user._id)
      .then((response) => {
        res.json(response);
      })
      .catch(() => {
        res.status(500).json({
          status: false,
          message: "Server error",
        });
      });
  },
};
