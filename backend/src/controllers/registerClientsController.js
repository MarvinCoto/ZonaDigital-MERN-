//Importamos todas las librerías
import jsonwebtoken from "jsonwebtoken"; // Token
import bcryptjs from "bcryptjs"; // Encriptar
import nodemailer from "nodemailer"; // Enviar correos
import crypto from "crypto"; // Generar código

import clientsModel from "../models/Clients.js"
import {config} from "../config.js"

//Array de funciones
const registerClientsController = {};

//Registro de clientes
registerClientsController.registerClient = async (req, res) => {

    //1-Pedimos las cosas que vamos a guardar
    const {
        name,
        lastName,
        birthday,
        email,
        password,
        telephone,
        dui,
        isVerified
    } = req.body;

    try {
        //Verificar si el cliente ya existe
        const existClient = await clientsModel.findOne({email})
        if(existClient) {
            return res.json({message: "Client already exists"})
        }

        //Encriptar la contrasela
        const passwordHash = await bcryptjs.hash(password, 10)

        //Guardamos en la base de datos
        const newClient = new clientsModel ({
            name,
            lastName,
            birthday,
            email,
            password: passwordHash,
            telephone,
            dui: dui || null,
            isVerified: isVerified || false,
        })

        await newClient.save()

        //Generar código de verificación
        const verificationCode = crypto.randomBytes(3).toString("hex")
        const expiresAt = Date.now() + 2 * 60 * 60 * 1000 ; //2 horas

        // TOKEN
        const tokenCode = jsonwebtoken.sign({
            //1- ¿que vamos a guardar?
            email, verificationCode, expiresAt},
            //2- Secreto
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            //4- arrow funtion
            (error, token) => {
                if(error) console.log("error"+error);
                res.cookie("verificationToken", token, { maxAge: 2 * 60 * 60 * 1000})

            }
        )

        // Enviar correo
        // 1- Transporter: ¿Desde dónde voy a enviar el correo?
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user,
                pass: config.email.pass
            }
        })

        //2- Options: ¿A quién se lo voy a enviar?
        const mailOptions = {
            from: config.email.user,
            to: email,
            subject: "Verificación de correo",
            text: `Para verificar que eres dueño de la cuenta utiliza este código: ${verificationCode}\nEste código expira en 2 horas\n` 
        }

        //3- Enviar el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) console.log("error" + error)
            res.json({message: "Email sent"})
        })

        res.json({message: "Client registered, Please verified your email"})

        
    } catch (error) {
        res.json({message: "error" + error})
    }
};

registerClientsController.verifyCodeEmail = async (req, res) => {
    const { verificationCode } = req.body;
    //Acceder al token "verification token"
    //Ya que contiene el email, el código de aplicaicon y cuando expira
    const token = req.cookies.verificationCode;

    if(!token) {
        return res.json({message: "Please, register your account first"})
    }

    try {
        //Verificamos y decodificar el token
        // Para obtener el email y el codigo de verificación
        // Que acabamos de guardar al momento de registrar
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;

        //Comparar el codigo recibido con el almacenado en el token
        if(verificationCode !== storedCode){
            return res.json({message: "Invalid verification code"})
        }
        
        //Busco al cliente
        const client = await clientsModel.findOne({email})
        if(!client){
            return res.json({message: "Client not found"})
        }

        //A ese cliente le cambio el campo "isVerified" a true
        client.isVerified = true,
        await client.save();
        
        //Quitar el token con el email, codigo de verificacion 
        res.clearCookie("verificationToken")

        res.json({message: "Email verified successfully"})


    } catch (error) {
        res.json({message: "error"+error})
    }

}

export default registerClientsController;