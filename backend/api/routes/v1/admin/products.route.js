const router = require("express").Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../../controllers/v1/products.controller");

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/productss/:id", deleteProduct);

module.exports = router;
