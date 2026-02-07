const router = require("express").Router();

const {
  getAttributes,
  getAttribute,
  getAttributeValues,
  getAttributeValuesBySlug,
} = require("../../../controllers/v1/attributes.controller");

router.get("/", getAttributes);

router.get("/:id", getAttribute);

router.get("/:id/values", getAttributeValues);

router.get("/slug/:slug/values", getAttributeValuesBySlug);

module.exports = router;
