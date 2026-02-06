const router = require("express").Router();

const {
  createSize,
  updateSize,
  deleteSize,
} = require("../../../controllers/v1/sizes.controller");

router.post("/", createSize);
router.put("/:id", updateSize);
router.delete("/:id", deleteSize);

module.exports = router;
