var express = require("express");
var router = express.Router();

var productHelpers = require("../helpers/product-helpers");
var userHelpers = require("../helpers/user-helpers");

const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/", async function (req, res, next) {
  let user = req.session.user;
  cartCount = null;
  if (user) {
    cartCount = await userHelpers.getCartCount(user._id);
    // console.log(cartCount);
  }
  productHelpers.getAllProducts().then((products) => {
    res.render("user/index", {
      title: "Home",
      products,
      user,
      cartCount,
    });
  });
});

router.get("/login", function (req, res, next) {
  if (req.session.loggedIn) res.redirect("/");
  else
    res.render("user/login", {
      title: "Login",
      err: req.session.loginErr,
    });
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/");
});

router.get("/register", function (req, res, next) {
  res.render("user/register", {
    title: "Register",
  });
});

router.post("/signup", function (req, res, next) {
  userHelpers.doSignup(req.body).then((response) => {
    // console.log(JSON.parse(JSON.stringify(response)));
    req.session.loggedIn = true;
    req.session.user = req.body;
    req.session.user._id = response.insertedId;
    if (response) res.redirect("/");
  });
});

router.post("/login", function (req, res, next) {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect("/");
    } else {
      req.session.loginErr = response.msg;
      res.redirect("/login");
    }
  });
});

router.get("/cart", verifyLogin, async function (req, res, next) {
  let cartProducts = await userHelpers.getCartProducts(req.session.user._id);
  res.render("user/cart", {
    title: "Cart",
    cartProducts,
    user: req.session.user,
  });
});

router.get("/add-to-cart/:id", function (req, res, next) {
  let proId = req.params.id;
  userHelpers.addToCart(proId, req.session.user._id).then(() => {
    // res.redirect("/");
    res.json({status:true})
  });
});

router.post("/change-cart-quantity",(req,res,next)=>{
  userHelpers.changeCartQuantity(req.body).then((response)=>{
    console.log(response);
    res.json(response)
  })
})

module.exports = router;
