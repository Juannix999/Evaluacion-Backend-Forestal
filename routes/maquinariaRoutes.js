// routes/maquinariaRoutes.js

const express = require('express');
const router = express.Router();
const maquinariaController = require('../controllers/maquinariaController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware'); // Importamos los middlewares

// Aplicamos el middleware de autenticación a TODAS las rutas de Maquinaria
// Criterio: Utiliza Sesiones de validación de acceso (Protección de rutas)
router.use(isAuthenticated); 

// Rutas CRUD

// POST /api/maquinaria -> Crear nueva maquinaria
// Restringimos la creación solo a Administradores
router.post('/', isAdmin, maquinariaController.createMaquinaria); 

// GET /api/maquinaria -> Listar toda la maquinaria
router.get('/', maquinariaController.getAllMaquinaria);

// PUT /api/maquinaria/:id -> Actualizar maquinaria existente
// Restringimos la actualización solo a Administradores
router.put('/:id', isAdmin, maquinariaController.updateMaquinaria); 

// DELETE /api/maquinaria/:id -> Eliminar maquinaria
// Restringimos la eliminación solo a Administradores
router.delete('/:id', isAdmin, maquinariaController.deleteMaquinaria); 

module.exports = router;