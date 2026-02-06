const router = require("express").Router();

const {
  getProducts,
  getProduct,
  getProductReviews,
  createProductReview,
} = require("../../../controllers/v1/products.controller");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/:id/reviews", getProductReviews);
router.post("/:id/reviews", createProductReview);

module.exports = router;
