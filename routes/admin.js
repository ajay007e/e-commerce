var express = require("express");
var router = express.Router();

var productHelpers = require("../helpers/product-helpers");

/* GET users listing. */
router.get("/", function (req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    res.render("admin/view-products", { title: "Admin", admin: true, products });
  })  
});

router.get("/add-product", function (req, res, next) {
  res.render("admin/add-product", { title: "Add Product", admin: true });
});

router.post("/add-product", function (req, res, next) {
  productHelpers.addProduct(req.body, (id) => {
    let img = req.files.image;
    img.mv("./public/product-images/" + id + ".jpg", (err, done) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin")
      }
    });
  });
});

module.exports = router;
