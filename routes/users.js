var express = require("express");
var router = express.Router();

var productHelpers = require("../helpers/product-helpers");

/* GET home page. */
router.get("/", function (req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    res.render("user/index", {
      title: "Home",
      products,
    });
  });
});

module.exports = router;
