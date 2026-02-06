const router = require("express").Router();

const { applyCoupon } = require("../../../controllers/v1/coupons.controller");

router.post("/apply", applyCoupon);

module.exports = router;
