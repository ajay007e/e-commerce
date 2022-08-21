var db = require("../config/connection");
var collections = require("../config/collection");
var objectID = require("mongodb").ObjectId;

const bcrypt = require("bcrypt");

module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);

      db.get()
        .collection(collections.USERS_COLLECTION)
        .insertOne(userData)
        .then((result) => {
          resolve(result);
        });
    });
  },

  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      loginStatus = false;
      res = {};
      let user = await db
        .get()
        .collection(collections.USERS_COLLECTION)
        .findOne({ email: userData.email });
      if (user) {
        bcrypt.compare(userData.password, user.password).then((status) => {
          if (status) {
            res.user = user;
            res.status = true;
          } else {
            res.status = false;
            res.msg = "Invalid Password";
          }
          resolve(res);
        });
      } else resolve({ status: false, msg: "Invalid Email" });
    });
  },

  addToCart: (proId, userId) => {
    let proObj = {
      item: objectID(proId),
      quantity: 1,
    };
    return new Promise(async (resolve, reject) => {
      let userCart = await db
        .get()
        .collection(collections.CARTS_COLLECTION)
        .findOne({ user: objectID(userId) });
      if (userCart) {
        let proExists = userCart.products.findIndex(
          (products) => products.item == proId
        );
        console.log(proExists);
        if (proExists != -1) {
          db.get()
            .collection(collections.CARTS_COLLECTION)
            .updateOne(
              { user: objectID(userId), "products.item": objectID(proId) },
              { $inc: { "products.$.quantity": 1 } }
            )
            .then(() => {
              resolve();
            });
        } else {
          db.get()
            .collection(collections.CARTS_COLLECTION)
            .updateOne(
              { user: objectID(userId) },
              {
                $push: { products: proObj },
              }
            )
            .then((res) => {
              resolve();
            });
        }
      } else {
        let cartObj = { user: objectID(userId), products: [proObj] };
        db.get()
          .collection(collections.CARTS_COLLECTION)
          .insertOne(cartObj)
          .then((resp) => {
            resolve();
          });
      }
    });
  },

  getCartProducts: (userId) => {
    return new Promise(async (resolve, reject) => {
      let cartItems = await db
        .get()
        .collection(collections.CARTS_COLLECTION)
        .aggregate([
          {
            $match: { user: objectID(userId) },
          },
          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
            },
          },
          {
            $lookup: {
              from: collections.PRODUCTS_COLLECTION,
              localField: "item",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              product: { $arrayElemAt: ["$product", 0] },
            },
          },
          // {
          //   $lookup: {
          //     from: collections.PRODUCTS_COLLECTION,
          //     let: { proList: "$products" },
          //     pipeline: [
          //       {
          //         $match: {
          //           $expr: {
          //             $in: ["$_id", "$$proList"],
          //           },
          //         },
          //       },
          //     ],
          //     as: "cartItems",
          //   },
          // },
        ])
        .toArray();
      try {
        // console.log(cartItems);
        resolve(cartItems);
      } catch (error) {
        resolve([]);
      }
    });
  },

  getCartCount: (userId) => {
    return new Promise(async (resolve, reject) => {
      let res = await db
        .get()
        .collection(collections.CARTS_COLLECTION)
        .findOne({ user: objectID(userId) });
      if (res) {
        resolve(res.products.length);
      } else {
        resolve(0);
      }
    });
  },
  changeCartQuantity: (details) => {
    return new Promise(async (resolve, reject) => {
      details.count = parseInt(details.count);
      details.quantity = parseInt(details.quantity);
      if (details.count === -1 && details.quantity === 1) {
        console.log(details.count, details.quantity,details.product);
        db.get()
          .collection(collections.CARTS_COLLECTION)
          .updateOne(
            { _id: objectID(details.cart) },
            {
              $pull: { products: { item: objectID(details.product) } },
            }
          )
          .then((res) => {
            console.log(res);
            resolve({ status: true, removeProduct: true });
          });
      } else {
        db.get()
          .collection(collections.CARTS_COLLECTION)
          .updateOne(
            {
              _id: objectID(details.cart),
              "products.item": objectID(details.product),
            },
            { $inc: { "products.$.quantity": details.count } }
          )
          .then((res) => {
            console.log(res);
            resolve({ status: true });
          });
      }
    });
  },
};
