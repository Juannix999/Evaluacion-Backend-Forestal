// controllers/maquinariaController.js

const db = require('../config/db');

// -----------------------------------------------------
// 1. CREAR Maquinaria (C)
// -----------------------------------------------------
exports.createMaquinaria = async (req, res) => {
    // Patente, tipo y horas_uso son campos críticos y obligatorios
    const { patente, tipo, horas_uso, ubicacion } = req.body;

    // Validación de datos (Criterio: Validación de datos críticos)
    if (!patente || !tipo || horas_uso === undefined) {
        return res.status(400).send('Faltan datos obligatorios (patente, tipo, horas_uso).');
    }
    
    // Validación adicional: horas_uso debe ser un número positivo
    if (isNaN(horas_uso) || horas_uso < 0) {
        return res.status(400).send('Horas de uso debe ser un número positivo.');
    }

    try {
        const query = 'INSERT INTO maquinaria (patente, tipo, horas_uso, ubicacion) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [patente, tipo, horas_uso, ubicacion]);
        
        res.status(201).json({ 
            message: 'Maquinaria registrada con éxito.',
            id: result.insertId
        });
    } catch (error) {
        // Manejo de errores (Criterio: Manejo de errores - ej. patente duplicada)
        console.error('Error al registrar maquinaria:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).send('La patente ya existe en el sistema.');
        }
        res.status(500).send('Error interno del servidor al crear maquinaria: ' + error.message);
    }
};

// -----------------------------------------------------
// 2. LEER TODA la Maquinaria (R - Read All)
// -----------------------------------------------------
exports.getAllMaquinaria = async (req, res) => {
    try {
        // Consulta: Codifica funciones que realicen operaciones CRUD
        const [rows] = await db.query('SELECT * FROM maquinaria ORDER BY patente ASC');
        
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener maquinaria:', error);
        res.status(500).send('Error interno del servidor al obtener la lista de maquinaria: ' + error.message);
    }
};

// -----------------------------------------------------
// 3. ACTUALIZAR Maquinaria (U)
// -----------------------------------------------------
exports.updateMaquinaria = async (req, res) => {
    const { id } = req.params;
    const { patente, tipo, horas_uso, ubicacion } = req.body;

    // Validación: debe haber al menos un campo para actualizar
    if (!patente && !tipo && horas_uso === undefined && !ubicacion) {
        return res.status(400).send('No hay datos para actualizar.');
    }

    try {
        const query = 'UPDATE maquinaria SET patente = ?, tipo = ?, horas_uso = ?, ubicacion = ? WHERE id_maquina = ?';
        const [result] = await db.query(query, [patente, tipo, horas_uso, ubicacion, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Maquinaria no encontrada.');
        }

        res.status(200).send('Maquinaria actualizada con éxito.');
    } catch (error) {
        console.error('Error al actualizar maquinaria:', error);
        res.status(500).send('Error interno del servidor al actualizar maquinaria: ' + error.message);
    }
};

// -----------------------------------------------------
// 4. ELIMINAR Maquinaria (D)
// -----------------------------------------------------
exports.deleteMaquinaria = async (req, res) => {
    const { id } = req.params;

    try {
        // Operación CRUD: Eliminar
        const [result] = await db.query('DELETE FROM maquinaria WHERE id_maquina = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Maquinaria no encontrada.');
        }

        res.status(200).send('Maquinaria eliminada con éxito.');
    } catch (error) {
        // Manejo de errores: Si la maquinaria tiene mantenciones asociadas (FK), fallará.
        console.error('Error al eliminar maquinaria:', error);
        res.status(500).send('Error interno del servidor al eliminar maquinaria: ' + error.message);
    }
};