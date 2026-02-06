const router = require("express").Router();

const {
  getUsers,
  getUser,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../../../controllers/v1/users.controller");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createAdmin);
router.put("/", updateAdmin);
router.delete("/", deleteAdmin);

module.exports = router;
