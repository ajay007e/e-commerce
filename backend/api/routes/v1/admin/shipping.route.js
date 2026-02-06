const router = require("express").Router();

const {
  createShipping,
  updateShipping,
  deleteShipping,
} = require("../../../controllers/v1/shipping.controller");

router.post("/", createShipping);
router.put("/:id", updateShipping);
router.delete("/:id", deleteShipping);

module.exports = router;
