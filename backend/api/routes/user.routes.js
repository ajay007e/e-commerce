const router = require("express").Router();
const controller = require("../controllers/user.controller");
const { verifyLogin } = require("../middlewares/auth.middleware");

router.get("/", controller.getHome);

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

router.get("/cart", verifyLogin, controller.getCart);
router.post("/cart/:id", verifyLogin, controller.addToCart);
router.patch("/cart", verifyLogin, controller.changeCartQuantity);
router.delete("/cart", verifyLogin, controller.deleteCartItem);

router.post("/order", verifyLogin, controller.placeOrder);
router.get("/orders", verifyLogin, controller.getOrders);
router.get("/orders/:id", verifyLogin, controller.getOrder);

router.post("/verify-payment", controller.verifyPayment);

module.exports = router;
