// server.js

const express = require('express');
const session = require('express-session');
require('dotenv').config();

// Módulos locales
const db = require('./config/db'); // Se importa para ejecutar la prueba de conexión a MySQL
const authRoutes = require('./routes/authRoutes'); // Rutas para /auth/login, /auth/register

const app = express();
const PORT = process.env.PORT || 3000;

// ======================================
// MIDDLEWARES GENERALES
// ======================================

// Middleware para procesar JSON (API) y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del Middleware de Sesiones (Criterio: Sesiones)
app.use(session({
    secret: process.env.SESSION_SECRET, // Clave secreta del archivo .env
    resave: false, 
    saveUninitialized: false, // Evita crear sesiones vacías
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, // Duración de 24 horas
        secure: false // Usar 'true' en producción con HTTPS
    } 
}));

// ======================================
// RUTAS
// ======================================

// 1. Ruta de prueba (Endpoint simple)
app.get('/', (req, res) => {
    res.send('Servidor Backend Forestal Funcionando. Listo para implementar rutas.');
});

// 2. Rutas de Autenticación (Login, Registro, Logout)
// Estas rutas se manejan bajo el prefijo /auth
// Criterio: Implementa sesiones, protección de rutas, hash seguro.
app.use('/auth', authRoutes); 


// ======================================
// INICIO DEL SERVIDOR
// ======================================

app.listen(PORT, () => {
    // La prueba de conexión a la BD se ejecuta al importar el módulo db
    console.log(`🚀 Servidor Express iniciado en http://localhost:${PORT}`);
});