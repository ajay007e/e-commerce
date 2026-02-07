const router = require("express").Router();

const {
  createAttribute,
  updateAttribute,
  createAttributeValue,
  updateAttributeValue,
} = require("../../../controllers/v1/attributes.controller");

router.post("/", createAttribute);
router.put("/:id", updateAttribute);

router.post("/values", createAttributeValue);
router.put("/values/:id", updateAttributeValue);

module.exports = router;
