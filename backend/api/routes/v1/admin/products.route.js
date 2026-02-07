const router = require("express").Router();
const upload = require("../../../middlewares/upload.middleware");

const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../../controllers/v1/products.controller");

router.post("/", upload.array("images", 5), createProduct);
router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
