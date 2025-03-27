//importo la librería que acabo de instalar
import dotenv from "dotenv";

// Ejecuto "Dotenv"
// me ayudará a acceder al .env
dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI || "mongodb://localhost:27017/ZonaDigitalDB20230644",
    },
    server: {
        port: process.env.PORT || 4000,
    },
    JWT: {
        scret: process.env.JWT_SCRET,
        expiresIn: process.env.JWT_SCRET,
    }
};