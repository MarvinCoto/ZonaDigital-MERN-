import rateLimit from 'express-rate-limit';

//1- Lo configuramos
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, //maximo de solicitudes http
    message: {
        status: 429,
        error: "Too many requests"
    }
})

export default limiter;