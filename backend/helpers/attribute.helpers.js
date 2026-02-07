const db = require("../config/connection");
const collections = require("../config/collection");
const ObjectID = require("mongodb").ObjectId;

module.exports = {
  /* =========================
     ATTRIBUTES
  ========================= */

  createAttribute: (data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ATTRIBUTES_COLLECTION)
        .findOne({ slug: data.slug })
        .then((existing) => {
          if (existing) {
            return resolve({
              status: false,
              message: "Attribute already exists",
            });
          }

          return db
            .get()
            .collection(collections.ATTRIBUTES_COLLECTION)
            .insertOne({
              name: data.name,
              slug: data.slug,
              type: data.type,
              createdAt: new Date(),
            });
        })
        .then(() => {
          resolve({
            status: true,
            message: "Attribute created",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  updateAttribute: (id, data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ATTRIBUTES_COLLECTION)
        .updateOne(
          { _id: ObjectID(id) },
          {
            $set: {
              name: data.name,
              slug: data.slug,
              updatedAt: new Date(),
            },
          },
        )
        .then((result) => {
          if (result.modifiedCount === 0) {
            return resolve({
              status: false,
              message: "Attribute not found",
            });
          }

          resolve({
            status: true,
            message: "Attribute updated",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getAttributes: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ATTRIBUTES_COLLECTION)
        .find()
        .sort({ name: 1 })
        .toArray()
        .then((attributes) => {
          resolve(attributes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getAttribute: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ATTRIBUTES_COLLECTION)
        .findOne({
          _id: ObjectID(id),
        })
        .then((attribute) => {
          resolve(attribute);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getAttributeBySlug: (slug) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ATTRIBUTES_COLLECTION)
        .findOne({ slug })
        .then((attribute) => {
          resolve(attribute);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  /* =========================
     ATTRIBUTE VALUES
  ========================= */

  createAttributeValue: (data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ATTRIBUTE_VALUES_COLLECTION)
        .findOne({
          attributeId: ObjectID(data.attributeId),
          value: data.value,
        })
        .then((existing) => {
          if (existing) {
            return resolve({
              status: false,
              message: "Value already exists",
            });
          }

          return db
            .get()
            .collection(collections.ATTRIBUTE_VALUES_COLLECTION)
            .insertOne({
              attributeId: ObjectID(data.attributeId),
              value: data.value,
              createdAt: new Date(),
            });
        })
        .then(() => {
          resolve({
            status: true,
            message: "Value created",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  updateAttributeValue: (id, value) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ATTRIBUTE_VALUES_COLLECTION)
        .updateOne(
          { _id: ObjectID(id) },
          {
            $set: {
              value,
              updatedAt: new Date(),
            },
          },
        )
        .then((result) => {
          if (result.modifiedCount === 0) {
            return resolve({
              status: false,
              message: "Value not found",
            });
          }

          resolve({
            status: true,
            message: "Value updated",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getAttributeValues: (attributeId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ATTRIBUTE_VALUES_COLLECTION)
        .find({
          attributeId: ObjectID(attributeId),
        })
        .sort({ createdAt: 1 })
        .toArray()
        .then((values) => {
          resolve(values);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
