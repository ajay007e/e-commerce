const router = require("express").Router();

const {
  getOrders,
  getOrder,
} = require("../../../controllers/v1/orders.controller");
router.get("/", getOrders);
router.get("/:id", getOrder);

module.exports = router;
