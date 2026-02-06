const router = require("express").Router();

const {
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../../controllers/v1/categories.controller");

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
