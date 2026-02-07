const attributeHelper = require("../../../helpers/attribute.helpers");

module.exports = {
  /* =========================
     ATTRIBUTES
  ========================= */

  getAttributes: (req, res, next) => {
    attributeHelper
      .getAttributes()
      .then((attributes) => {
        console.log(attributes);
        res.json({
          success: true,
          attributes,
        });
      })
      .catch((err) => {
        next(err);
      });
  },

  getAttribute: (req, res, next) => {
    attributeHelper
      .getAttribute(req.params.id)
      .then((attribute) => {
        if (!attribute) {
          return res.status(404).json({
            success: false,
            message: "Attribute not found",
          });
        }

        res.json({
          success: true,
          attribute,
        });
      })
      .catch((err) => {
        next(err);
      });
  },

  createAttribute: (req, res, next) => {
    const { name, slug, type } = req.body;

    if (!name || !slug || !type) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    attributeHelper
      .createAttribute({ name, slug, type })
      .then((result) => {
        if (!result.status) {
          return res.status(409).json(result);
        }

        res.status(201).json(result);
      })
      .catch((err) => {
        next(err);
      });
  },

  updateAttribute: (req, res, next) => {
    const { name, slug } = req.body;

    attributeHelper
      .updateAttribute(req.params.id, { name, slug })
      .then((result) => {
        if (!result.status) {
          return res.status(404).json(result);
        }

        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  },

  /* =========================
     ATTRIBUTE VALUES
  ========================= */

  getAttributeValues: (req, res, next) => {
    attributeHelper
      .getAttributeValues(req.params.id)
      .then((values) => {
        res.json({
          success: true,
          values,
        });
      })
      .catch((err) => {
        next(err);
      });
  },

  createAttributeValue: (req, res, next) => {
    const { attributeId, value } = req.body;

    if (!attributeId || !value) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    attributeHelper
      .createAttributeValue({ attributeId, value })
      .then((result) => {
        if (!result.status) {
          return res.status(409).json(result);
        }

        res.status(201).json(result);
      })
      .catch((err) => {
        next(err);
      });
  },

  updateAttributeValue: (req, res, next) => {
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({
        success: false,
        message: "Value is required",
      });
    }

    attributeHelper
      .updateAttributeValue(req.params.id, value)
      .then((result) => {
        if (!result.status) {
          return res.status(404).json(result);
        }

        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  },

  getAttributeValuesBySlug: async (req, res, next) => {
    try {
      const { slug } = req.params;

      if (!slug) {
        return res.status(400).json({
          success: false,
          message: "Attribute slug is required",
        });
      }

      const attribute = await attributeHelper.getAttributeBySlug(slug);

      if (!attribute) {
        return res.status(404).json({
          success: false,
          message: "Attribute not found",
        });
      }

      const values = await attributeHelper.getAttributeValues(attribute._id);

      return res.json({
        success: true,
        values,
      });
    } catch (err) {
      next(err);
    }
  },
};
