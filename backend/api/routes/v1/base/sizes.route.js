const router = require("express").Router();

const {
  getSizes,
  getSize,
} = require("../../../controllers/v1/sizes.controller");

router.get("/", getSizes);
router.get("/:id", getSize);

module.exports = router;
