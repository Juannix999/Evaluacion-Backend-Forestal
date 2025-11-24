// middleware/authMiddleware.js

// Middleware para verificar si el usuario ha iniciado sesión (Rutas protegidas)
exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next(); // El usuario está autenticado, continuar con la ruta
    }
    // Si no está autenticado, devuelve error 401
    res.status(401).send('Acceso denegado. Por favor inicie sesión.');
};

// Middleware para verificar roles (útil para ELIMINAR/CREAR)
exports.isAdmin = (req, res, next) => {
    // Si la sesión existe y el rol es 'administrador'
    if (req.session.user && req.session.user.rol === 'administrador') {
        return next(); 
    }
    // Si no es administrador, devuelve error 403 (Prohibido)
    res.status(403).send('Permiso denegado. Se requiere rol de administrador.');
};