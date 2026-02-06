const router = require("express").Router();

const {
  getShippings,
  getShipping,
} = require("../../../controllers/v1/shipping.controller");

router.get("/", getShippings);
router.get("/:id", getShipping);

module.exports = router;
