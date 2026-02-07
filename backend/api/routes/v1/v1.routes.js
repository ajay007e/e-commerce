const express = require("express");
const router = express.Router();
const baseRouter = require("./base.routes");
const adminRouter = require("./admin.routes");

router.use("/", baseRouter);
router.use("/admin", adminRouter);

module.exports = router;
