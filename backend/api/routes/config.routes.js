const express = require("express");
const router = express.Router();
const controller = require("../controllers/config.controller");

router.put("/hero", controller.updateHeroSectionConfig);
router.get("/hero", controller.getHeroSectionConfig);

// Create category / sub-category
router.post("/categories", controller.createCategory);
// Update category
router.put("/categories/:id", controller.updateCategory);
// Get all categories (tree)
router.get("/categories", controller.getCategories);
// Get single category
router.get("/categories/:id", controller.getCategoryById);

// Get all sizes
router.get("/sizes", controller.getSizes);
// Create size
router.post("/sizes", controller.createSize);
// Update size
router.put("/sizes/:id", controller.updateSize);

module.exports = router;
