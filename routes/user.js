const { json, response } = require("express");
var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/product-helpers");
var userHelper = require("../helpers/user-helpers");

const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

/* GET home page. */
router.get("/", async function (req, res, next) {
  let user = req.session.user;
  let cartCount = null;
  if (req.session.loggedIn) {
    cartCount = await userHelper.getCartCount(req.session.user._id);
  }
  productHelper.getAllProducts().then((products) => {
    res.render("user/view-products", {
      title: "Home",
      products,
      user,
      cartCount,
    });
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("user/login", { title: "Login", error: req.session.loginErr });
    req.session.loginErr = false;
  }
});

router.post("/login", (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    // console.log(response);
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect("/");
    } else {
      req.session.loginErr = true;
      res.redirect("/login");
    }
  });
});

router.get("/signup", (req, res) => {
  res.render("user/signup", { title: "Signup" });
});

router.post("/signup", (req, res) => {
  userHelper.doSignup(req.body).then((response) => {
    if (response) {
      // console.log(response);
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect("/");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.redirect("/");
    else console.log(err);
  });
});

router.get("/cart", verifyLogin, async (req, res) => {
  let total = 0;
  let cart = await userHelper.getCartProducts(req.session.user._id);
  if (cart) {
    total = await userHelper.getTotalAmount(req.session.user._id);
  }
  // console.log(cart);
  res.render("user/cart", {
    title: "Cart",
    total,
    user: req.session.user,
    cart,
  });
});

router.get("/add-to-cart/:id", (req, res) => {
  // console.log("called");
  userHelper.addToCart(req.params.id, req.session.user._id).then(() => {
    res.json({ status: true });
    // res.redirect("/");
  });
});

router.get("/orders", verifyLogin, async (req, res) => {
  let cartCount = null;
  let orders = await userHelper.getOrders(req.session.user._id);
  if (req.session.loggedIn) {
    cartCount = await userHelper.getCartCount(req.session.user._id);
    // console.log(cartCount);
  }
  res.render("user/orders", {
    title: "Orders",
    user: req.session.user,
    cartCount,
    orders,
  });
});
router.post("/change-product-quantity", (req, res) => {
  userHelper.changeProductQuantity(req.body).then(async (response) => {
    // console.log(response);
    response.total = await userHelper.getTotalAmount(req.body.user);
    res.json(response);
  });
});
router.get("/delete-from-cart/:id", (req, res) => {
  // console.log(req.params.id);
  userHelper
    .deleteCartProduct(req.params.id, req.session.user._id)
    .then((response) => {
      // console.log(response);
      res.json({ status: true });
    });
});
router.get("/place-order", verifyLogin, async (req, res) => {
  let total = 0;
  total = await userHelper.getTotalAmount(req.session.user._id);
  res.render("user/place-order", {
    title: "Place Order",
    user: req.session.user,
    total,
  });
});

router.post("/place-order", async (req, res) => {
  // console.log(req.body);
  let cartList = await userHelper.getCartProductList(req.body.userId);
  let total = await userHelper.getTotalAmount(req.body.userId);
  userHelper.placeOrder(req.body, cartList, total).then((orderId) => {
    // console.log(req.body);
    if (req.body.paymentMethod === "cod") {
      res.json({ codSuccess: true });
    } else {
      userHelper.generateRazopay(orderId, total).then((response) => {
        // console.log(response);
        res.json(response);
      });
    }
  });
});

router.get("/go-to-orders", (req, res) => {
  res.render("user/go-to-orders", {
    title: "Go to Orders",
    user: req.session.user,
  });
});

router.get("/view-order-products/:id", verifyLogin, async (req, res) => {
  // console.log(req.params.id);
  let products = await userHelper.getOrderProducts(req.params.id);
  res.render("user/view-order-products", {
    title: "Order Products",
    user: req.session.user,
    products,
  });
});
router.post("/verify-payment", (req, res) => {
  // console.log(req.body);
  userHelper
    .verifyPayment(req.body)
    .then(() => {
      userHelper.changePaymentStatus(req.body["order[receipt]"]).then(() => {
        console.log("here");
        res.json({ status: true });
      });
    })
    .catch((err) => {
      // console.log(err);
      res.json({ status: false });
    });
});

module.exports = router;
