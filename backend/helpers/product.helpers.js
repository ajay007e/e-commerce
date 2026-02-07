const db = require("../config/connection");
const collections = require("../config/collection");
const filesHelper = require("../helpers/files.helpers");

const ObjectId = require("mongodb").ObjectId;

module.exports = {
  /* =====================================
     Create
  ===================================== */

  createProduct: (data, files) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.name || data.name.trim().length < 3) {
          return resolve({
            status: false,
            message: "Product name must be at least 3 characters",
          });
        }

        if (!data.categoryId) {
          return resolve({
            status: false,
            message: "Category is required",
          });
        }

        if (!data.pricing?.originalPrice) {
          return resolve({
            status: false,
            message: "Price is required",
          });
        }

        if (!data.variants || !data.variants.length) {
          return resolve({
            status: false,
            message: "At least one variant required",
          });
        }

        /* Build image urls */
        const images = (files || []).map((f, i) => ({
          url: `/uploads/products/${f.filename}`,
          isPrimary: i === 0, // first = primary
          alt: data.name,
        }));

        if (images.length > 5) {
          return resolve({
            status: false,
            message: "Max 5 images allowed",
          });
        }

        data.media = { images };

        const product = {
          name: data.name.trim(),

          shortDescription: data.shortDescription || "",
          longDescription: data.longDescription || "",

          categoryId: new ObjectId(data.categoryId),

          tags: Array.isArray(data.tags) ? data.tags : [],

          pricing: data.pricing,

          availability: data.availability || {
            status: "AVAILABLE",
          },

          variants: data.variants,

          details: data.details || { bullets: [] },

          sizeAndFit: data.sizeAndFit || { bullets: [] },

          materialAndCare: data.materialAndCare || {
            bullets: [],
          },

          specifications: data.specifications || {
            table: [],
          },

          media: data.media || { images } || { images: [] },

          seo: data.seo || {
            title: "",
            description: "",
          },

          isActive: true,

          createdAt: new Date(),
          updatedAt: new Date(),
        };

        /* SKU check */

        const skus = product.variants.map((v) => v.sku);

        const existing = await db
          .get()
          .collection(collections.PRODUCTS_COLLECTION)
          .findOne({
            "variants.sku": { $in: skus },
          });

        if (existing) {
          return resolve({
            status: false,
            message: "SKU already exists",
          });
        }

        resolve({ status: true, product, message: "" });
        const result = await db
          .get()
          .collection(collections.PRODUCTS_COLLECTION)
          .insertOne(product);

        product._id = result.insertedId;

        resolve({
          status: true,
          product,
          message: "Product created successfully",
        });
      } catch (err) {
        console.error("Create Product Helper:", err);
        reject(err);
      }
    });
  },

  /* =====================================
     Update
  ===================================== */

  updateProduct: (id, data, files, removed) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!ObjectId.isValid(id)) {
          return resolve({
            status: false,
            message: "Invalid product id",
          });
        }

        /* Delete removed files */
        removed.forEach((url) => {
          filesHelper.deleteFile(url);
        });

        /* Keep old images */
        let images =
          product.media?.images?.filter((img) => !removed.includes(img.url)) ||
          [];

        /* Add new */
        const newImages = (files || []).map((f) => ({
          url: `/uploads/products/${f.filename}`,
          alt: data.name || product.name,
          isPrimary: false,
        }));

        images = [...images, ...newImages];

        if (images.length > 5) {
          return resolve({
            status: false,
            message: "Max 5 images allowed",
          });
        }

        /* Ensure primary */
        if (!images.some((i) => i.isPrimary)) {
          images[0].isPrimary = true;
        }

        data.media = { images };
        const update = {
          ...data,
          updatedAt: new Date(),
        };

        if (data.categoryId) {
          update.categoryId = new ObjectId(data.categoryId);
        }

        const result = await db
          .get()
          .collection(collections.PRODUCTS_COLLECTION)
          .updateOne({ _id: new ObjectId(id) }, { $set: update });

        if (!result.matchedCount) {
          return resolve({
            status: false,
            message: "Product not found",
          });
        }

        resolve({
          status: true,
          message: "Product updated successfully",
        });
      } catch (err) {
        console.error("Update Product Helper:", err);
        reject(err);
      }
    });
  },

  /* =====================================
     Delete
  ===================================== */

  deleteProduct: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!ObjectId.isValid(id)) {
          return resolve({
            status: false,
            message: "Invalid product id",
          });
        }

        const result = await db
          .get()
          .collection(collections.PRODUCTS_COLLECTION)
          .deleteOne({
            _id: new ObjectId(id),
          });

        if (!result.deletedCount) {
          return resolve({
            status: false,
            message: "Product not found",
          });
        }

        resolve({
          status: true,
          message: "Product deleted successfully",
        });
      } catch (err) {
        console.error("Delete Product Helper:", err);
        reject(err);
      }
    });
  },

  /* =====================================
     Get Products
  ===================================== */

  getProducts: (params = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const query = { isActive: true };

        /* Filters */
        if (params.categoryId) {
          query.categoryId = new ObjectId(params.categoryId);
        }

        if (params.search) {
          query.name = {
            $regex: params.search,
            $options: "i",
          };
        }

        /* Pagination */
        const page = Number(params.page) || 1;
        const limit = Number(params.limit) || 12;
        const skip = (page - 1) * limit;

        /* Aggregation */
        const result = await db
          .get()
          .collection(collections.PRODUCTS_COLLECTION)
          .aggregate([
            { $match: query },

            { $sort: { createdAt: -1 } },

            {
              $facet: {
                products: [{ $skip: skip }, { $limit: limit }],

                meta: [{ $count: "total" }],
              },
            },
          ])
          .toArray();

        const products = result[0].products;

        const totalCount = result[0].meta[0]?.total || 0;

        const totalPages = Math.ceil(totalCount / limit);

        resolve({
          status: true,

          products,

          page: {
            current: page,
            limit,
            totalCount,
            totalPages,
          },
        });
      } catch (err) {
        console.error("Get Products Helper:", err);
        reject(err);
      }
    });
  },

  /* =====================================
     Get Single Product
  ===================================== */

  getProduct: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!ObjectId.isValid(id)) {
          return resolve({
            status: false,
            message: "Invalid product id",
          });
        }

        const product = await db
          .get()
          .collection(collections.PRODUCTS_COLLECTION)
          .findOne({
            _id: new ObjectId(id),
            isActive: true,
          });

        if (!product) {
          return resolve({
            status: false,
            message: "Product not found",
          });
        }

        resolve({
          status: true,
          product,
        });
      } catch (err) {
        console.error("Get Product Helper:", err);
        reject(err);
      }
    });
  },

  /* =====================================
     Reviews
  ===================================== */

  getProductReviews: (productId) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!ObjectId.isValid(productId)) {
          return resolve({
            status: false,
            message: "Invalid product id",
          });
        }

        const reviews = await db
          .get()
          .collection(collections.REVIEWS_COLLECTION)
          .find({
            productId: new ObjectId(productId),
          })
          .sort({ createdAt: -1 })
          .toArray();

        resolve({
          status: true,
          reviews,
        });
      } catch (err) {
        console.error("Get Reviews Helper:", err);
        reject(err);
      }
    });
  },

  createProductReview: (productId, data, userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!ObjectId.isValid(productId)) {
          return resolve({
            status: false,
            message: "Invalid product id",
          });
        }

        if (!data.rating || !data.comment) {
          return resolve({
            status: false,
            message: "Rating and comment required",
          });
        }

        const review = {
          productId: new ObjectId(productId),
          userId: new ObjectId(userId),

          rating: Number(data.rating),
          comment: data.comment.trim(),

          createdAt: new Date(),
        };

        await db
          .get()
          .collection(collections.REVIEWS_COLLECTION)
          .insertOne(review);

        resolve({
          status: true,
          message: "Review added",
        });
      } catch (err) {
        console.error("Create Review Helper:", err);
        reject(err);
      }
    });
  },
};
