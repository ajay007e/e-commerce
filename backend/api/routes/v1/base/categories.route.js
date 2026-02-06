const router = require("express").Router();

const {
  getCategories,
  getCategory,
} = require("../../../controllers/v1/categories.controller");

router.get("/", getCategories);
router.get("/:id", getCategory);

module.exports = router;
