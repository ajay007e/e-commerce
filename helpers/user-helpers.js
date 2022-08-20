var db = require("../config/connection");
var collections = require("../config/collection");

const bcrypt = require("bcrypt");
const collection = require("../config/collection");

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
};
