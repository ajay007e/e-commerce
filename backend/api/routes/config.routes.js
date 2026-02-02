const express = require("express");
const router = express.Router();
const controller = require("../controllers/config.controller");

router.put("/hero", controller.updateHeroSectionConfig);
router.get("/hero", controller.getHeroSectionConfig);

module.exports = router;
