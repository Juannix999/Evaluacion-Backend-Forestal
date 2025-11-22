// server.js

const express = require('express');
const session = require('express-session');
require('dotenv').config();
const db = require('./config/db'); // Ejecuta la prueba de conexión

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON (API) y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del Middleware de Sesiones
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false, 
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, // 24 horas
        secure: false 
    } 
}));


// Rutas de prueba (Endpoint simple)
app.get('/', (req, res) => {
    res.send('Servidor Backend Forestal Funcionando. Listo para implementar rutas.');
});


// Inicia el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express iniciado en http://localhost:${PORT}`);
});