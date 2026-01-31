const fs = require("fs");
const productHelpers = require("../../helpers/product-helpers");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productHelpers.getAllProducts();
    res.json({
      success: true,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

exports.addProduct = (req, res, next) => {
  try {
    req.body.price = parseInt(req.body.price);

    productHelpers.addProduct(req.body, (id) => {
      const img = req.files?.image;
      if (img) {
        img.mv(`./public/product-images/${id}.jpg`);
      }

      res.status(201).json({
        success: true,
        data: { productId: id },
      });
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const proId = req.params.id;
    const response = await productHelpers.deleteProduct(proId);

    if (response.acknowledged) {
      fs.unlink(`./public/product-images/${proId}.jpg`, () => {});
    }

    res.json({
      success: true,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await productHelpers.getProduct(req.params.id);
    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    req.body.price = parseInt(req.body.price);
    await productHelpers.editProduct(req.body);

    const img = req.files?.image;
    if (img) {
      img.mv(`./public/product-images/${req.body.id}.jpg`);
    }

    res.json({
      success: true,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
