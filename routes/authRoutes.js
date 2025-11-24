// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Ruta para crear un nuevo usuario
router.post('/register', authController.registerUser);

// Ruta para iniciar sesión
router.post('/login', authController.loginUser);

// Ruta para cerrar sesión
router.post('/logout', authController.logoutUser);

// Ruta de prueba protegida (solo accesible si hay sesión activa)
router.get('/protected', isAuthenticated, (req, res) => {
    res.json({ 
        message: 'Esta es una ruta protegida. Acceso autorizado.', 
        user: req.session.user 
    });
});

module.exports = router;