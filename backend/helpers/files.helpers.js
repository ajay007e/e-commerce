const fs = require("fs");
const path = require("path");

module.exports = {
  deleteFile: (url) => {
    try {
      if (!url) return;

      /* Only allow uploads folder */
      if (!url.startsWith("/uploads/products/")) {
        return;
      }

      const filePath = path.join(process.cwd(), url);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error("File Delete Error:", err);
    }
  },
};
