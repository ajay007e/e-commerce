const router = require("express").Router();
const controller = require("../controllers/admin.controller");

router.post("/onboard", controller.onboard);
router.get("/products", controller.getAllProducts);
router.post("/products", controller.addProduct);
router.get("/products/:id", controller.getProduct);
router.put("/products/:id", controller.editProduct);
router.delete("/products/:id", controller.deleteProduct);

module.exports = router;
