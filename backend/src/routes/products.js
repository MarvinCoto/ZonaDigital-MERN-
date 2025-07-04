import express from "express";
import productsController from "../controllers/productsController.js";

//Router nos ayuda a colocar los métodos que tendrá mi ruta
const router = express.Router();

router.route("/")
.get(productsController.getProducts)
.post(productsController.createProducts)

router.route("/:id")
.put(productsController.updateProducts)
.delete(productsController.deleteProducts);

router.route("/total-stock").get(productsController.totalStock)

export default router;