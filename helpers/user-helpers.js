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
    return new Promise(async (resolve, reject) => {
      let userCart = await db
        .get()
        .collection(collections.CARTS_COLLECTION)
        .findOne({ user: objectID(userId) });
      if (userCart) {
        db.get()
          .collection(collections.CARTS_COLLECTION)
          .updateOne(
            { user: objectID(userId) },
            {
              $push: { products: objectID(proId) },
            }
          )
          .then((res) => {
            console.log(res);
            resolve();
          });
      } else {
        let cartObj = { user: objectID(userId), products: [objectID(proId)] };
        db.get()
          .collection(collections.CARTS_COLLECTION)
          .insertOne(cartObj)
          .then((resp) => {
            console.log(resp);
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
            $lookup: {
              from: collections.PRODUCTS_COLLECTION,
              let: { proList: "$products" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$proList"],
                    },
                  },
                },
              ],
              as: "cartItems",
            },
          },
        ])
        .toArray();
      resolve(cartItems[0].cartItems);
    });
  },
};
