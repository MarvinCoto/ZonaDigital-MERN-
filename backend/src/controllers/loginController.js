//Importamos modelos
import customersModel from "../models/Clients.js"
import employeesModel from "../models/Employees.js"
import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Token
import { config } from "../config.js"

//Array de funciones

const loginController = {};

loginController.login = async(req, res) => {
    //Pedimos las cosas
    const {email, password} = req.body;

    try {
        //Validamos los 3 posibles niveles
        //1. Admin, 2- Empleado, 3. Cliente

        let userFound; //Guarda el usuario encontrado
        let userType;  //Guarda el tipo de usuario encontrado

        //1. Admin
        if(email === config.ADMIN.emailAdmin && password === config.ADMIN.password) {
            userType = "admin";
            userFound = {_id: "admin"}
        } else {

            //2. Empleados
            userFound = await employeesModel.findOne({email})
            userType = "employee"

            if(!userFound) {
                //3. Cliente
                userFound = await customersModel.findOne({email})
                userType = "customer"
            }
        }

        //Si no encontramos a ningun usuario con esas credenciales
        if(!userFound){
            return res.json({message: "User not found"});
        }

        //Primero, verificar si el usuario está bloqueado
        if(userType !== "Admin"){

            if(userFound.timeOut > Date.now()){

                const minutosRestantes = Math.ceil(userFound.timeOut - Date.now()/60000)

                res.status(403).json({message: "Cuenta bloqueada, faltan" + minutosRestantes})
            }
        }

        //Validar la contraseña
        //SOLO SI NO ES ADMIN
        if(userType !== "admin") {
            const isMatch = await bcryptjs.compare(password, userFound.password)
            if(!isMatch){

                //1- Si se equivoca en la contraseña
                //Vamos a sumar 1 al contador de intentos fallidos
                userFound.loginAttemps = userFound.loginAttemps + 1;

                if(userFound.loginAttemps >= 3){
                    //Bloqueamos la cuenta
                    userFound.timeOut = Date.now() + 5 * 60 * 1000;

                    userFound.loginAttemps = 0;
                    await userFound.save()

                    return res.status(403).json({message: "Cuenta bloqueada"})
                }

                await userFound.save()
                return res.json({message: "Invalid password"})
            }

            userFound.loginAttemps = 0;
            userFound.timeOut = null;
            await userFound.save();

        }

        /// TOKEN
        //Para validar que inició sesión
        jsonwebtoken.sign(
            //1- Que voy a guardar
            {id: userFound._id, userType},
            //2- Secreto
            config.JWT.secret,
            //3- Cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4- Función flecha
            (error, token) => {
                if(error) console.log("error" + error)
                res.cookie("authToken", token)
                res.json({message: "Login succesful"})
            }

        )

    } catch (error) {
        console.log("error" + error);
    }
};

export default loginController;




