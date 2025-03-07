// Importo todo lo de la librería de Express
import express from "express";

//Creo una constante que es igual a la librería que importé
const app = express();

//Definimos las rutas de las funciones que tendrá la página web

app.use("api/products")

//Exporto la constante para poder usar express en otros archivos
export default app;

