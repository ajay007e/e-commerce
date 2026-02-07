var db = require("../config/connection");
var collections = require("../config/collection");
var objectID = require("mongodb").ObjectId;

module.exports = {
  addProduct: (product, callback) => {
    db.get()
      .collection(collections.PRODUCTS_COLLECTION)
      .insertOne(product)
      .then((data) => {
        callback(data.insertedId.toString());
      });
  },

  editProduct: (product) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCTS_COLLECTION)
        .updateOne(
          { _id: objectID(product.id) },
          {
            $set: {
              name: product.name,
              category: product.category,
              price: product.price,
              description: product.description,
            },
          },
        )
        .then((res) => {
          resolve();
        });
    });
  },

  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.PRODUCTS_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },

  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCTS_COLLECTION)
        .deleteOne({ _id: objectID(id) })
        .then((res) => {
          resolve(res);
        });
    });
  },

  getProduct: (id) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collections.PRODUCTS_COLLECTION)
        .findOne({ _id: objectID(id) })
        .then((res) => {
          resolve(res);
        });
    });
  },
};
