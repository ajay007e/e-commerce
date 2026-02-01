const fs = require("fs");
const userHelpers = require("../../helpers/user-helpers");
const productHelpers = require("../../helpers/product-helpers");
/**
 * GET /
 * Home – products + cart count
 */
exports.getHome = async (req, res) => {
  try {
    const user = req.session.user || null;
    let cartCount = 0;

    if (user) {
      cartCount = await userHelpers.getCartCount(user._id);
    }

    const products = await productHelpers.getAllProducts();

    res.json({
      success: true,
      products,
      user,
      cartCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /signup
 */
exports.signup = async (req, res) => {
  try {
    const response = await userHelpers.doSignup(req.body);

    req.session.loggedIn = true;
    req.session.user = {
      ...req.body,
      _id: response.insertedId,
    };

    res.json({
      success: true,
      userId: response.insertedId,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /login
 */
exports.login = async (req, res) => {
  try {
    const response = await userHelpers.doLogin(req.body);

    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;

      res.json({
        success: true,
        user: response.user,
      });
    } else {
      res.status(401).json({
        success: false,
        message: response.msg,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /logout
 */
exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ success: true });
};

/**
 * GET /cart
 */
exports.getCart = async (req, res) => {
  try {
    const userId = req.session.user._id;

    const cartProducts = await userHelpers.getCartProducts(userId);
    const total = await userHelpers.getTotalPrice(userId);

    res.json({
      success: true,
      cartProducts,
      total,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /cart/:id
 */
exports.addToCart = async (req, res) => {
  try {
    const proId = req.params.id;
    const userId = req.session.user._id;

    await userHelpers.addToCart(proId, userId);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /cart
 */
exports.changeCartQuantity = async (req, res) => {
  try {
    const response = await userHelpers.changeCartQuantity(req.body);
    response.total = await userHelpers.getTotalPrice(req.session.user._id);

    res.json({
      success: true,
      ...response,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /cart
 */
exports.deleteCartItem = async (req, res) => {
  try {
    const response = await userHelpers.deleteCartItem(req.body);

    res.json({
      success: true,
      response,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /order
 */
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const orderList = await userHelpers.getOrderList(req.body.userId);
    const total = await userHelpers.getTotalPrice(userId);

    const orderId = await userHelpers.placeOrder(req.body, orderList, total);

    if (req.body.mode === "cod") {
      res.json({ success: true, codSuccess: true });
    } else {
      const response = await userHelpers.generateRazopay(orderId, total);
      res.json(response);
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /orders
 */
exports.getOrders = async (req, res) => {
  try {
    const orders = await userHelpers.getOrders(req.session.user._id);

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /orders/:id
 */
exports.getOrder = async (req, res) => {
  try {
    const order = await userHelpers.getOrder(req.params.id);

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /verify-payment
 */
exports.verifyPayment = async (req, res) => {
  try {
    await userHelpers.verifyPayment(req.body);
    await userHelpers.changePaymentStatus(req.body["order[receipt]"]);

    res.json({ status: true });
  } catch (err) {
    res.json({ status: false });
  }
};
