import express from "express";
import registerEmployeesController from "../controllers/registerEmployeesController.js";

const router = express.Router();

router.router("/").post(registerEmployeesController.register)

export default router