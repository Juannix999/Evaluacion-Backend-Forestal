// controllers/authController.js

const db = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Nivel de seguridad del hash

// Función auxiliar para buscar un usuario por nombre
async function getUserByUsername(username) {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [username]);
    return rows[0];
}

// -----------------------------------------------------
// 1. REGISTRO (Crear un usuario)
// -----------------------------------------------------
exports.registerUser = async (req, res) => {
    const { username, password, rol } = req.body;
    
    // Validación de datos críticos
    if (!username || !password) {
        return res.status(400).send('Se requieren nombre de usuario y contraseña.');
    }

    try {
        // Generar hash seguro de la contraseña (Criterio: Contraseñas con hash)
        const hash = await bcrypt.hash(password, saltRounds);

        // Insertar el nuevo usuario en la base de datos
        await db.query(
            'INSERT INTO usuarios (nombre_usuario, contrasena_hash, rol) VALUES (?, ?, ?)',
            [username, hash, rol || 'operario']
        );
        
        res.status(201).send(`Usuario ${username} registrado con éxito.`);

    } catch (error) {
        // Manejo de errores (Criterio: Manejo de errores - ej. usuario duplicado)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).send('El nombre de usuario ya existe.');
        }
        res.status(500).send('Error al registrar usuario: ' + error.message);
    }
};

// -----------------------------------------------------
// 2. INICIO DE SESIÓN (Login)
// -----------------------------------------------------
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(401).send('Credenciales incorrectas.');
        }

        // Comparar la contraseña ingresada con el hash almacenado
        const match = await bcrypt.compare(password, user.contrasena_hash);

        if (match) {
            // Éxito: Crear sesión (Criterio: Sistema de Sesiones)
            req.session.user = { 
                id: user.id_usuario, 
                username: user.nombre_usuario, 
                rol: user.rol 
            };
            return res.send(`Inicio de sesión exitoso. Bienvenido, ${user.nombre_usuario}.`);
        } else {
            return res.status(401).send('Credenciales incorrectas.');
        }

    } catch (error) {
        res.status(500).send('Error al iniciar sesión: ' + error.message);
    }
};

// -----------------------------------------------------
// 3. CIERRE DE SESIÓN (Logout)
// -----------------------------------------------------
exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión.');
        }
        res.send('Sesión cerrada correctamente.');
    });
};