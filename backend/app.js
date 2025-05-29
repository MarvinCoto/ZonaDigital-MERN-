// Importo todo lo de la librería de Express
import express from "express";
import productsRoutes from "./src/routes/products.js"
import clientsRoutes from "./src/routes/clients.js"
import employeesRoutes from "./src/routes/employees.js"
import branchesRoutes from "./src/routes/branches.js"
import reviewsRoutes from "./src/routes/reviews.js"
import registerEmployeesRoutes from "./src/routes/registerEmployees.js";
import cookieParser from "cookie-parser";
import loginRoutes from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js"
import registerClientRoutes from "./src/routes/registerClients.js"
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js"
import providersRoutes from "./src/routes/providers.js"
import { validateAuthToken } from "./src/middlewares/ValidateAuthToken.js";
import cors from "cors"

//Creo una constante que es igual a la librería que importé
const app = express();

app.use(
    cors({
      origin: "https://zona-digital-mern-6ycb.vercel.app",
      // Permitir envío de cookies y credenciales
      credentials: true
    })
);

//Que acepte datos en json
app.use(express.json());

//Que postman acepte guardar cookies
app.use(cookieParser());

//Definimos las rutas de las funciones que tendrá la página web

app.use("/api/products", productsRoutes)
app.use("/api/clients", clientsRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/branches", branchesRoutes)
app.use("/api/reviews", reviewsRoutes)

app.use("/api/registerEmployees", validateAuthToken(["admin"]), registerEmployeesRoutes)
app.use("/api/login", loginRoutes)
app.use("/api/logout", logoutRoutes)

app.use("/api/registerClients", registerClientRoutes)

app.use("/api/recoveryPassword", recoveryPasswordRoutes); 

app.use("/api/providers", validateAuthToken(["admin"]), providersRoutes)

//Exporto la constante para poder usar express en otros archivos
export default app;

