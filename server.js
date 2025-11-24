// server.js

const express = require('express');
const session = require('express-session');
require('dotenv').config();

// ======================================
// IMPORTACIÓN DE MÓDULOS LOCALES
// ======================================
const db = require('./config/db'); // Se importa para ejecutar la prueba de conexión a MySQL
const authRoutes = require('./routes/authRoutes'); // Rutas para /auth
const maquinariaRoutes = require('./routes/maquinariaRoutes'); // Rutas para /api/maquinaria
const mantencionRoutes = require('./routes/mantencionRoutes'); // Rutas para /api/mantenciones

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
// ENRUTAMIENTO (Rutas de la Aplicación)
// ======================================

// 1. Ruta de prueba (Endpoint simple)
app.get('/', (req, res) => {
    res.send('Servidor Backend Forestal Funcionando. Proyecto Finalizado (4 Commits).');
});

// 2. Rutas de Autenticación (Login, Registro, Logout)
app.use('/auth', authRoutes); 

// 3. Rutas de Maquinaria (Entidad Operacional 1)
app.use('/api/maquinaria', maquinariaRoutes); 

// 4. Rutas de Mantenciones (Entidad Operacional 2)
app.use('/api/mantenciones', mantencionRoutes);


// ======================================
// INICIO DEL SERVIDOR
// ======================================

app.listen(PORT, () => {
    // La prueba de conexión a la BD se ejecuta al importar el módulo db
    console.log(`🚀 Servidor Express iniciado en http://localhost:${PORT}`);
});