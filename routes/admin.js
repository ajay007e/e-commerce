var express = require("express");
var router = express.Router();
const productHelper = require("../helpers/product-helpers");
const fs = require("fs");

router.get("/", function (req, res, next) {
  productHelper.getAllProducts().then((products) => {
    res.render("admin/view-products", {
      title: "Products",
      admin: true,
      products,
    });
  });
});
router.get("/add-product", function (req, res) {
  res.render("admin/add-product", { title: "Add Products", admin: true });
});

router.post("/add-product", (req, res) => {
  productHelper.addProduct(req.body, (id) => {
    let image = req.files.image;
    image.mv("public/images/product-images/" + id + ".jpg", (err, done) => {
      if (!err) {
        res.redirect("add-product");
      } else {
        console.log(err);
      }
    });
  });
});

router.get("/edit-product/:id", (req, res) => {
  // console.log(proId);
  let proId = req.params.id;
  productHelper.getProduct(proId).then((product) => {
    res.render("admin/edit-product", {
      title: "Edit Product",
      product,
      admin: true,
    });
  });
});

router.post("/edit-product/:id", (req, res) => {
  productHelper.editProduct(req.params.id, req.body).then((product) => {
    res.redirect("/admin");
    if (req.files.image) {
      let image = req.files.image;
      image.mv("public/images/product-images/" + req.params.id + ".jpg");
    }
  });
});

router.get("/delete-product", (req, res) => {
  let proId = req.query.id;
  // console.log(proId);
  productHelpers.deleteProduct(proId).then((response) => {
    fs.unlink(
      "./public/images/product-images/" + proId + ".jpg",
      function (err) {
        if (err) {
          console.log(err);
        } else res.redirect("/admin");
      }
    );
  });
});
router.get("/users", (req, res) => {
  res.render("admin/users", { title: "All Users", admin: true });
});
router.get("/orders", async (req, res) => {
  let orders = await productHelper.getAllOrders();
  console.log(orders);
  res.render("admin/orders", {
    title: "All Orders",
    admin: true,
    orders,
  });
});
module.exports = router;
