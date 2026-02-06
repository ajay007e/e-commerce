const db = require("../config/connection");
const collections = require("../config/collection");
const ObjectID = require("mongodb").ObjectId;

module.exports = {
  createCoupon: (data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.COUPONS_COLLECTION)
        .findOne({ code: data.code })
        .then((existing) => {
          if (existing) {
            return resolve({
              status: false,
              message: "Coupon already exists",
            });
          }
          return db
            .get()
            .collection(collections.COUPONS_COLLECTION)
            .insertOne({
              code: data.code.toUpperCase(),
              discountType: data.discountType,
              discountValue: Number(data.discountValue),
              minAmount: Number(data.minAmount),
              maxDiscount: Number(data.maxDiscount || 0),
              expiry: new Date(data.expiry),
              usageLimit: Number(data.usageLimit),
              usedBy: [],
              createdAt: new Date(),
            });
        })
        .then(() => {
          resolve({
            status: true,
            message: "Coupon created",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  updateCoupon: (id, data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.COUPONS_COLLECTION)
        .updateOne(
          { _id: ObjectID(id) },
          {
            $set: {
              discountType: data.discountType,
              discountValue: Number(data.discountValue),
              minAmount: Number(data.minAmount),
              maxDiscount: Number(data.maxDiscount || 0),
              expiry: new Date(data.expiry),
              usageLimit: Number(data.usageLimit),
              updatedAt: new Date(),
            },
          },
        )
        .then((result) => {
          if (result.modifiedCount === 0) {
            return resolve({
              status: false,
              message: "Coupon not found",
            });
          }
          resolve({
            status: true,
            message: "Coupon updated",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteCoupon: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.COUPONS_COLLECTION)
        .deleteOne({ _id: ObjectID(id) })
        .then((result) => {
          if (result.deletedCount === 0) {
            return resolve({
              status: false,
              message: "Coupon not found",
            });
          }
          resolve({
            status: true,
            message: "Coupon deleted",
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getCoupons: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.COUPONS_COLLECTION)
        .find()
        .sort({ createdAt: -1 })
        .toArray()
        .then((coupons) => {
          resolve(coupons);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCoupon: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.COUPONS_COLLECTION)
        .findOne({ _id: ObjectID(id) })
        .then((coupon) => {
          resolve(coupon);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  applyCoupon: (code, userId, cartTotal) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.COUPONS_COLLECTION)
        .findOne({ code: code.toUpperCase() })

        .then((coupon) => {
          if (!coupon) {
            return resolve({
              status: false,
              message: "Invalid coupon",
            });
          }

          if (new Date() > coupon.expiry) {
            return resolve({
              status: false,
              message: "Coupon expired",
            });
          }

          if (cartTotal < coupon.minAmount) {
            return resolve({
              status: false,
              message: `Minimum order ₹${coupon.minAmount}`,
            });
          }

          if (coupon.usedBy.length >= coupon.usageLimit) {
            return resolve({
              status: false,
              message: "Coupon limit reached",
            });
          }

          if (coupon.usedBy.includes(ObjectID(userId).toString())) {
            return resolve({
              status: false,
              message: "Already used",
            });
          }

          let discount = 0;
          if (coupon.discountType === "percent") {
            discount = (cartTotal * coupon.discountValue) / 100;
          } else {
            discount = coupon.discountValue;
          }
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
          const finalAmount = cartTotal - discount;
          resolve({
            status: true,
            discount,
            finalAmount,
            couponId: coupon._id,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
