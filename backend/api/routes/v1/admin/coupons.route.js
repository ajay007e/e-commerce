const router = require("express").Router();

const {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupons,
  getCoupon,
} = require("../../../controllers/v1/coupons.controller");

router.post("/", createCoupon);
router.get("/", getCoupons);
router.get("/:id", getCoupon);
router.put("/:id", updateCoupon);
router.delete("/:id", deleteCoupon);

module.exports = router;
