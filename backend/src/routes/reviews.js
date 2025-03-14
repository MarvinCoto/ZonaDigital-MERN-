import express from "express";
import reviewController from "../controllers/reviewController.js";

//Router nos ayuda a colocar los métodos que tendrá mi ruta
const router = express.Router();

router.route("/")
.get(reviewController.getReviews)
.post(reviewController.createReviews)

router.route("/:id")
.put(reviewController.updateReviews)
.delete(reviewController.deleteReviews);

export default router;

