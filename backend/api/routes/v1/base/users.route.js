const router = require("express").Router();

const {
  getMe,
  updateMe,
  deleteMe,
} = require("../../../controllers/v1/users.controller");

router.get("/me", getMe);
router.put("/me", updateMe);
router.delete("/me", deleteMe);

module.exports = router;
