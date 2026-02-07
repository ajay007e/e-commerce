const db = require("../config/connection");
const collections = require("../config/collection");
const ObjectID = require("mongodb").ObjectId;

module.exports = {
  createCategory: (data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CATEGORIES_COLLECTION)
        .findOne({ name: data.name })
        .then((existing) => {
          if (existing) {
            return resolve({
              status: false,
              message: "Category already exists",
            });
          }
          return db
            .get()
            .collection(collections.CATEGORIES_COLLECTION)
            .insertOne({
              name: data.name,
              parentId: data.parentId,
              slug: data.slug,
              createdAt: new Date(),
            });
        })
        .then(() => {
          resolve({
            status: true,
            message: "Category created",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateCategory: (id, data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CATEGORIES_COLLECTION)
        .updateOne(
          { _id: ObjectID(id) },
          {
            $set: {
              name: data.name,
              parentId: data.parentId,
              slug: data.slug,
              updatedAt: new Date(),
            },
          },
        )
        .then((result) => {
          if (result.modifiedCount === 0) {
            return resolve({
              status: false,
              message: "Category not found",
            });
          }
          resolve({
            status: true,
            message: "Category updated",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CATEGORIES_COLLECTION)
        .deleteOne({
          _id: ObjectID(id),
        })
        .then((result) => {
          if (result.deletedCount === 0) {
            return resolve({
              status: false,
              message: "Category not found",
            });
          }
          resolve({
            status: true,
            message: "Category deleted",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCategories: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CATEGORIES_COLLECTION)
        .find()
        .sort({ name: 1 })
        .toArray()
        .then((categories) => {
          resolve(categories);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCategory: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CATEGORIES_COLLECTION)
        .findOne({
          _id: ObjectID(id),
        })
        .then((category) => {
          resolve(category);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
