import jsonwebtoken from "jsonwebtoken"; //Token
import bcrypt from "bcryptjs"; //Encriptar
import { config } from "../config.js"

import clientsModel from "../models/Clients.js"
import employeesModel from "../models/Employees.js";

import {sendEmail, HTMLRecoveryEmail} from "../utils/mailPasswordRecovery.js"

//1- Crear un array de funciones
const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async(req, res) =>{
    const { email } = req.body;

    try {
        
      let userFound;
      let userType;

      userFound = await clientsModel.findOne({ email })
      if(userFound){
        userType = "client"
      }else{
        userFound = await employeesModel.findOne({ email })
        if(userFound) {
            userType = "employee"
        }
      }

      if(!userFound){
        res.json({message: "User not found"})
      }
//exequiel.miranda245
      //Generar un código aleatorio
      // (El que se va a enviar)
      const code = Math.floor(10000+Math.random()*90000).toString();

      //Guardamos todo en un token
      const token = jsonwebtoken.sign(
        //1-¿Qué voy a guardar?
        {email, code, userType, verified: false},
        //2-Secret key
        config.JWT.secret,
        //3-¿Cuando expira?
        {expiresIn: "20m"}
      )

      res.cookie("tokenRecoveryCode", token, {maxAge: 20*60*1000})

      //ÚLTIMO PASO => enviar el correo con el código
      await sendEmail(
        email,
        "Your verification code", //Asunto
        "Hello! Remember to don't forget your password", //Cuerpo del mensaje
        HTMLRecoveryEmail(code) //HTML
      );

      res.json({message: "Email sent"})

    } catch (error) {
       console.log("error" + error);
    }
};

//Función para verificar código
passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    //Sacar el token de las cookies
    const token = req.cookies.tokenRecoveryCode

    //Extraer la información del token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret)

    if(decoded.code !== code){
      return res.json({message: "Invalid code"})
    }

    //Marcar el token como verificado
    const newToken = jsonwebtoken.sign(
      //1-¿Qué vamos a guardar?
      {email: decoded.email, 
       code: decoded.code,
       userType: decoded.userType,
      verified: true
      },
      //2-Secret key
      config.JWT.secret,
      //3-¿Cuando expira?
      {expiresIn: "20m"}
    )

    res.cookie("tokenRecoveryCode", newToken, {maxAge: 20*60*1000})

    res.json({message: "Code verified succesfully"})
  } catch (error) {
    console.log("error" + error)
  }
}

//Función para asignar la nueva contraseña
passwordRecoveryController.newPassword = async(req, res) => {
  
  const { newPassword } = req.body;

  try{

    //Extraer el token de las cookies
    const token = req.cookies.tokenRecoveryCode;

    //Extraer la información del token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret)
    
    //Verificar si el código fue verificado
    if(!decoded.verified){
     return res.json({message: "Code not verified"})
    }

    //Extraer el email y el userType del token
    const { email, userType } = decoded;

    //Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    //Actualizar la contraseña en la base de datos
    let updatedUser;

    if(userType === "client"){
      updatedUser = await clientsModel.findOneAndUpdate(
        {email},
        {password: hashedPassword},
        {new: true}
      )
    } else if (userType === "employee") {
      updatedUser = await employeesModel.findOneAndUpdate(
        {email},
        {password: hashedPassword},
        {new: true}
      )
    }

    //Quitamos el token
    res.clearCookie("tokenRecoveryCode")

    //Responden en postman
    res.json({message: "Password updated"})

 } catch (error) {
   console.log("error" + error)
 }

}

export default passwordRecoveryController;