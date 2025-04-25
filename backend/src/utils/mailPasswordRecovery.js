import nodemailer from "nodemailer";
import { config } from "../config.js";

//Configurar el transporter
//¿Quién envía el correo?
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    },
})

//¿Quién lo envía?
const sendEmail = async (to, subject, body, html) =>{
    try {
        const info = await transporter.sendMail({
            from: "20230644@ricaldone.edu.sv",
            to, //Para quien
            subject, //El asunto
            body, //Cuerpo del mensaje (text)
            html //HTML
        });

        return info;

    } catch (error) {
        console.log("error" + error);
    }

};

const HTMLRecoveryEmail = (code) =>{
    return `
    <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f9; padding: 30px 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #2c3e50; font-size: 28px; font-weight: 600; margin-bottom: 20px;">Password Recovery</h1>
  <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 20px;">
    Hello, we received a request to reset your password. Please use the verification code below to proceed with the password reset process:
  </p>
  
  <div style="display: inline-block; padding: 15px 30px; font-size: 20px; font-weight: bold; color: #fff; background-color: #ff7f50; border-radius: 5px; border: 1px solid #e67e22; margin-bottom: 30px;">
    ${code}
  </div>

  <p style="font-size: 14px; color: #777; line-height: 1.5; margin-bottom: 20px;">
    This code is valid for the next <strong>15 minutes</strong>. If you didn’t request this email, you can safely ignore it.
  </p>
  
  <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

  <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 20px;">
    If you need further assistance, please contact our support team at:
  </p>

  <a href="mailto:support@example.com" style="background-color: #3498db; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: 600;">Contact Support</a>

  <footer style="font-size: 12px; color: #aaa; margin-top: 40px;">
    <p>If you did not request a password reset, you can safely ignore this message.</p>
    <p style="margin-top: 10px;">© 2025 Your Company. All rights reserved.</p>
  </footer>
</div>

    `;
};

export { sendEmail, HTMLRecoveryEmail }; 

