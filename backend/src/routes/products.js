import express from "express";

//Router nos ayuda a colocar los métodos que tendrá mi ruta
const router = express.Router();

router.route("/")
.get()
.post()
.put()
.delete();