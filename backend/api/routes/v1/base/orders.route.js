const router = require("express").Router();

const {
  createOrder,
  getUserOrders,
  getUserOrder,
} = require("../../../controllers/v1/orders.controller");

router.post("/", createOrder);
router.get("/", getUserOrders);
router.get("/:id", getUserOrder);

module.exports = router;
