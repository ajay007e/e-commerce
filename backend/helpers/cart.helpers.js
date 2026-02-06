const db = require("../config/connection");
const collections = require("../config/collection");

const ObjectID = require("mongodb").ObjectId;

const MAX_CART_ITEMS = 50;

module.exports = {
  getCartDetails: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db
          .get()
          .collection(collections.CARTS_COLLECTION)
          .aggregate([
            {
              $match: { user: ObjectID(userId) },
            },
            {
              $unwind: "$products",
            },
            {
              $lookup: {
                from: collections.PRODUCTS_COLLECTION,
                localField: "products.item",
                foreignField: "_id",
                as: "product",
              },
            },
            {
              $project: {
                item: "$products.item",
                quantity: "$products.quantity",
                product: { $arrayElemAt: ["$product", 0] },
              },
            },

            {
              $group: {
                _id: null,

                cartProducts: {
                  $push: {
                    item: "$item",
                    quantity: "$quantity",
                    product: "$product",
                  },
                },

                totalPrice: {
                  $sum: {
                    $multiply: ["$quantity", "$product.price"],
                  },
                },

                cartCount: {
                  $sum: "$quantity",
                },
              },
            },
          ])
          .toArray();

        if (result.length > 0) {
          resolve(result[0]);
        } else {
          resolve({
            cartProducts: [],
            totalPrice: 0,
            cartCount: 0,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  addItem: (proId, userId) => {
    let proObj = {
      item: ObjectID(proId),
      quantity: 1,
    };

    return new Promise(async (resolve, reject) => {
      try {
        let userCart = await db
          .get()
          .collection(collections.CARTS_COLLECTION)
          .findOne({ user: ObjectID(userId) });

        if (userCart) {
          let proExists = userCart.products.findIndex(
            (product) => product.item.toString() === proId,
          );

          if (proExists !== -1) {
            await db
              .get()
              .collection(collections.CARTS_COLLECTION)
              .updateOne(
                {
                  user: ObjectID(userId),
                  "products.item": ObjectID(proId),
                },
                {
                  $inc: { "products.$.quantity": 1 },
                },
              );

            resolve({ status: true, message: "Quantity updated" });
          } else {
            if (userCart.products.length >= MAX_CART_ITEMS) {
              return reject({
                status: false,
                message: "Cart limit reached (Max 50 items)",
              });
            }

            await db
              .get()
              .collection(collections.CARTS_COLLECTION)
              .updateOne(
                { user: ObjectID(userId) },
                {
                  $push: { products: proObj },
                },
              );

            resolve({ status: true, message: "Product added to cart" });
          }
        } else {
          let cartObj = {
            user: ObjectID(userId),
            products: [proObj],
          };

          await db
            .get()
            .collection(collections.CARTS_COLLECTION)
            .insertOne(cartObj);

          resolve({ status: true, message: "Cart created" });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  changeCartQuantity: async (details) => {
    try {
      const count = parseInt(details.count);
      const quantity = parseInt(details.quantity);

      const cartId = ObjectID(details.cart);
      const productId = ObjectID(details.product);

      if (count !== 1 && count !== -1) {
        return { status: false, message: "Invalid count value" };
      }

      if (count === -1 && quantity === 1) {
        await db
          .get()
          .collection(collections.CARTS_COLLECTION)
          .updateOne(
            { _id: cartId },
            {
              $pull: { products: { item: productId } },
            },
          );

        return {
          status: true,
          message: "Product removed",
        };
      }

      await db
        .get()
        .collection(collections.CARTS_COLLECTION)
        .updateOne(
          {
            _id: cartId,
            "products.item": productId,
          },
          {
            $inc: { "products.$.quantity": count },
          },
        );

      return {
        status: true,
        message: "Quantity updated",
      };
    } catch (error) {
      console.error("changeCartQuantity error:", error);

      return {
        status: false,
        message: "Something went wrong",
      };
    }
  },
  deleteCartItem: async ({ cart, prod }) => {
    try {
      const cartId = ObjectID(cart);
      const productId = ObjectID(prod);

      const result = await db
        .get()
        .collection(collections.CARTS_COLLECTION)
        .updateOne(
          { _id: cartId },
          {
            $pull: {
              products: { item: productId },
            },
          },
        );

      if (result.modifiedCount === 0) {
        return {
          status: false,
          message: "Product not found in cart",
        };
      }

      return {
        status: true,
        message: "Product removed from cart",
      };
    } catch (error) {
      console.error("deleteCartItem error:", error);

      return {
        status: false,
        message: "Something went wrong",
      };
    }
  },
};
