const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

/* Folder */
const uploadDir = "public/uploads/products";

/* Ensure dir exists */
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* Storage */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const name = crypto.randomBytes(12).toString("hex") + ext;

    cb(null, name);
  },
});

/* Only Images */
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only images allowed"), false);
  } else {
    cb(null, true);
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5, // Max 5 images
  },
});
