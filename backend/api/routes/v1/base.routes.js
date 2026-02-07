const router = require("express").Router();

const authRouter = require("./base/auth.route");
const attributesRouter = require("./base/attributes.route");
const cartRouter = require("./base/cart.route");
const categoriesRouter = require("./base/categories.route");
const configRouter = require("./base/config.route");
const couponsRouter = require("./base/coupons.route");
const healthRouter = require("./base/health.route");
const ordersRouter = require("./base/orders.route");
const paymentRouter = require("./base/payment.route");
const productsRouter = require("./base/products.route");
const shippingRouter = require("./base/shipping.route");
const usersRouter = require("./base/users.route");
const versionRouter = require("./base/version.route");
const wishlistRouter = require("./base/wishlist.route");

router.use("/auth", authRouter);
router.use("/attributes", attributesRouter);
router.use("/cart", cartRouter);
router.use("/categories", categoriesRouter);
router.use("/config", configRouter);
router.use("/coupons", couponsRouter);
router.use("/health", healthRouter);
router.use("/orders", ordersRouter);
router.use("/shipping", shippingRouter);
router.use("/payment", paymentRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);
router.use("/version", versionRouter);
router.use("/wishlist", wishlistRouter);

module.exports = router;
