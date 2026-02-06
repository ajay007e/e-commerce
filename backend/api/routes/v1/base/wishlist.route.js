const router = require("express").Router();

const {
  getWishlist,
  addWishlist,
  deleteWishlist,
} = require("../../../controllers/v1/wishlist.controller");

router.get("/", getWishlist);
router.post("/:id", addWishlist);
router.delete("/:id", deleteWishlist);

module.exports = router;
