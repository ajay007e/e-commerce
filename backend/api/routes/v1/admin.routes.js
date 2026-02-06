const router = require("express").Router();

const analyticsRouter = require("./admin/analytics.route");
const categoriesRouter = require("./admin/categories.route");
const configRouter = require("./admin/config.route");
const couponsRouter = require("./admin/coupons.route");
const ordersRouter = require("./admin/orders.route");
const shippingRouter = require("./admin/shipping.route");
const productsRouter = require("./admin/products.route");
const sizesRouter = require("./admin/sizes.route");
const usersRouter = require("./admin/users.route");

router.use("/analytics", analyticsRouter);
router.use("/categories", categoriesRouter);
router.use("/config", configRouter);
router.use("/coupons", couponsRouter);
router.use("/orders", ordersRouter);
router.use("/shipping", shippingRouter);
router.use("/products", productsRouter);
router.use("/sizes", sizesRouter);
router.use("/users", usersRouter);

module.exports = router;
