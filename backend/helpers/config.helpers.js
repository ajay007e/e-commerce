var db = require("../config/connection");
var collections = require("../config/collection");
var objectID = require("mongodb").ObjectId;

module.exports = {
  updateConfig: (configKey, config) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.CONFIGS_COLLECTION)
        .updateOne(
          { key: configKey },
          {
            $set: {
              key: configKey,
              config: config,
            },
          },
          { upsert: true },
        )
        .then(() => resolve())
        .catch(reject);
    });
  },
  getConfig: (configKey) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collections.CONFIGS_COLLECTION)
        .findOne({ key: configKey })
        .then((res) => {
          resolve(res);
        });
    });
  },
};
