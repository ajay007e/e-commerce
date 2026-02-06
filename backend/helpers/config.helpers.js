const db = require("../config/connection");
const collections = require("../config/collection");

module.exports = {
  getConfig: (key) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CONFIGS_COLLECTION)
        .findOne({ key })
        .then((config) => {
          resolve(config);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getAllConfigs: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CONFIGS_COLLECTION)
        .find()
        .sort({ key: 1 })
        .toArray()
        .then((configs) => {
          resolve(configs);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  upsertConfig: (key, data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CONFIGS_COLLECTION)
        .updateOne(
          { key },
          {
            $set: {
              key,
              data,
              updatedAt: new Date(),
            },
            $setOnInsert: {
              createdAt: new Date(),
            },
          },
          { upsert: true },
        )
        .then(() => {
          resolve({
            status: true,
            message: "Config saved",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  deleteConfig: (key) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CONFIGS_COLLECTION)
        .deleteOne({ key })
        .then((result) => {
          if (result.deletedCount === 0) {
            return resolve({
              status: false,
              message: "Config not found",
            });
          }
          resolve({
            status: true,
            message: "Config deleted",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
