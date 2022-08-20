var express = require("express");
var router = express.Router();
var fs = require("fs");

var productHelpers = require("../helpers/product-helpers");

/* GET users listing. */
router.get("/", function (req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    res.render("admin/view-products", {
      title: "Admin",
      admin: true,
      products,
    });
  });
});

router.get("/add-product", function (req, res, next) {
  res.render("admin/add-product", { title: "Add Product", admin: true });
});

router.post("/add-product", function (req, res, next) {
  productHelpers.addProduct(req.body, (id) => {
    let img = req.files.image;
    img.mv("./public/product-images/" + id + ".jpg", (err, done) => {
      if (err) console.log(err);
      else res.redirect("/admin");
    });
  });
});

router.get("/delete-product/:id", function (req, res, next) {
  proId = req.params.id;
  productHelpers.deleteProduct(proId).then((response) => {
    if (response.acknowledged) {
      fs.unlink("./public/product-images/" + proId + ".jpg", (err) => {
        if (err) console.log(err);
        else res.redirect("/admin");
      });
    } else res.redirect("/admin");
  });
});

router.get("/edit-product/", function (req, res, next) {
  proId = req.query.id;
  productHelpers.getProduct(proId).then((product) => {
    res.render("admin/edit-product", { admin: true, product });
  });
});

router.post("/edit-product", function (req, res, next) {
  productHelpers.editProduct(req.body).then(() => {
    try {
      img = req.files.image;
      img.mv("./public/product-images/" + req.body.id + ".jpg", (err, done) => {
        if (err) console.log(err);
        else res.redirect("/admin");
      });
    } catch (error) {
      res.redirect("/admin");
    }
  });
});

module.exports = router;
