//Importar el modelo
import employeeModel from "../models/Employees.js";
import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Token
import { config } from "../config.js"

// Creamos un array de funciones
const registerEmployeesController = {};

registerEmployeesController.register = async(req, res) => {
    //Pedir todos los datos que vamos a guardar
    const {name,
           lastName,
           birthday,
           email,
           address,
           password,
           hireDate,
           telephone,
           dui,
           isVerified,
           issnumber
    } = req.body;

    try {
        //1- Verificamos si el empleado ya existe
        const existEmployee = await employeeModel.findOne({email})
        if(existEmployee) {
            return res.json({message: "Employee already exist"})
        }

        //2- Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10)

        //3- Guardar todo en la tabla Empleados
        const newEmployee = new employeeModel({name,
        lastName,
        birthday,
        email,
        address,
        password: passwordHash,
        hireDate,
        telephone,
        dui,
        isVerified,
        issnumber
        })

        await newEmployee.save();

        //TOKEN
        jsonwebtoken.sign(
            //1- Que voy a guardar
            {id: newEmployee._id},
            //2- Secreto
            config.JWT.secret,
            //3- Cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4- Función flecha
            (error, token) => {
                if(error) console.log("error" + error)

                res.cookie("authToken", token)
                res.json({message: "Employee saved"})
            }
        )


    } catch (error) {
        console.log("error" + error)
        res.json({message: "Error saving employee"})

    }
}

export default registerEmployeesController;