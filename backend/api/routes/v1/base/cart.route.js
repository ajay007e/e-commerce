const express = require("express");
const router = express.Router();

const {
  getCart,
  addItem,
  updateItem,
  deleteItem,
} = require("../../../controllers/v1/cart.controller");

router.get("/", getCart);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
