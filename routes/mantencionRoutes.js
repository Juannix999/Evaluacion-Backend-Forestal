// routes/mantencionRoutes.js

const express = require('express');
const router = express.Router();
const mantencionController = require('../controllers/mantencionController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware'); 

// Aplicamos el middleware de autenticación a TODAS las rutas de Mantenciones
router.use(isAuthenticated); 

// Rutas CRUD

// POST /api/mantenciones -> Crear nuevo registro (Admin puede crearlo)
router.post('/', isAdmin, mantencionController.createMantencion); 

// GET /api/mantenciones -> Listar todas las mantenciones
router.get('/', mantencionController.getAllMantenciones);

// PUT /api/mantenciones/:id -> Actualizar registro
router.put('/:id', isAdmin, mantencionController.updateMantencion); 

// DELETE /api/mantenciones/:id -> Eliminar registro
router.delete('/:id', isAdmin, mantencionController.deleteMantencion); 

module.exports = router;