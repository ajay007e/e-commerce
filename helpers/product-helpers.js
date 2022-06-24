var db = require("../config/connection");
var collection = require("../config/collections");
var objectId = require("mongodb").ObjectID;

module.exports = {
  addProduct: (product, callback) => {
    // console.log(product);
    product.price = parseFloat(product.price);
    db.get()
      .collection(collection.PRODUCT_COLLECTION)
      .insertOne(product)
      .then((data) => {
        callback(data.ops[0]._id);
      });
  },
  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collection.PRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },
  getProduct: (proId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .findOne({ _id: objectId(proId) })
        .then((response) => {
          // console.log(response);
          resolve(response);
        });
    });
  },
  editProduct: (proId, proDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .updateOne(
          { _id: objectId(proId) },
          {
            $set: {
              name: proDetails.name,
              price: proDetails.price,
              category: proDetails.category,
              description: proDetails.description,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },
  deleteProduct: (proId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .removeOne({ _id: objectId(proId) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  getAllOrders: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collection.ORDER_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },
};
