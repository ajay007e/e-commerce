const couponHelpers = require("../../../helpers/coupons.helpers");

module.exports = {
  createCoupon: (req, res) => {
    couponHelpers
      .createCoupon(req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.error("createCoupon error:", error);
        res.status(500).json({
          status: false,
          message: "Failed to create coupon",
        });
      });
  },

  updateCoupon: (req, res) => {
    couponHelpers
      .updateCoupon(req.params.id, req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.error("updateCoupon error:", error);
        res.status(500).json({
          status: false,
          message: "Failed to update coupon",
        });
      });
  },

  deleteCoupon: (req, res) => {
    couponHelpers
      .deleteCoupon(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.error("deleteCoupon error:", error);
        res.status(500).json({
          status: false,
          message: "Failed to delete coupon",
        });
      });
  },

  getCoupons: (req, res) => {
    couponHelpers
      .getCoupons()
      .then((coupons) => {
        res.json({
          status: true,
          coupons,
        });
      })
      .catch((error) => {
        console.error("getCoupons error:", error);
        res.status(500).json({
          status: false,
          message: "Failed to load coupons",
        });
      });
  },

  getCoupon: (req, res) => {
    couponHelpers
      .getCoupon(req.params.id)
      .then((coupon) => {
        if (!coupon) {
          return res.status(404).json({
            status: false,
            message: "Coupon not found",
          });
        }
        res.json({
          status: true,
          coupon,
        });
      })
      .catch((error) => {
        console.error("getCoupon error:", error);
        res.status(500).json({
          status: false,
          message: "Failed to load coupon",
        });
      });
  },

  applyCoupon: (req, res) => {
    const userId = req.session.user._id;
    const { code, total } = req.body;
    couponHelpers
      .applyCoupon(code, userId, Number(total))
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.error("applyCoupon error:", error);
        res.status(500).json({
          status: false,
          message: "Failed to apply coupon",
        });
      });
  },
};
