// controllers/mantencionController.js

const db = require('../config/db');

// -----------------------------------------------------
// 1. CREAR Mantención (C)
// -----------------------------------------------------
exports.createMantencion = async (req, res) => {
    const { id_maquina, fecha, tipo, descripcion, responsable, costo } = req.body;

    // Validación de datos (Criterio: Validación de datos críticos)
    if (!id_maquina || !fecha || !tipo || costo === undefined) {
        return res.status(400).send('Faltan datos obligatorios (ID Maquina, fecha, tipo, costo).');
    }
    
    // Validación adicional: costo debe ser un número positivo
    if (isNaN(costo) || parseFloat(costo) <= 0) {
        return res.status(400).send('El costo debe ser un número positivo.');
    }

    try {
        const query = `
            INSERT INTO mantenciones (id_maquina, fecha, tipo, descripcion, responsable, costo) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [id_maquina, fecha, tipo, descripcion, responsable, costo]);
        
        res.status(201).json({ 
            message: 'Mantención registrada con éxito.',
            id: result.insertId
        });
    } catch (error) {
        // Manejo de errores (Criterio: Manejo de errores - ej. FK inválida)
        console.error('Error al registrar mantención:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
             // Error común si la id_maquina no existe
             return res.status(400).send('Error: La Maquinaria con ID ' + id_maquina + ' no existe.');
        }
        res.status(500).send('Error interno del servidor al crear mantención: ' + error.message);
    }
};

// -----------------------------------------------------
// 2. LEER TODAS las Mantenciones (R - Read All)
// -----------------------------------------------------
exports.getAllMantenciones = async (req, res) => {
    try {
        // Hacemos un JOIN para obtener datos de la máquina asociada
        const query = `
            SELECT m.*, maq.patente, maq.tipo AS tipo_maquina 
            FROM mantenciones m
            JOIN maquinaria maq ON m.id_maquina = maq.id_maquina
            ORDER BY m.fecha DESC
        `;
        const [rows] = await db.query(query);
        
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener mantenciones:', error);
        res.status(500).send('Error interno del servidor al obtener la lista de mantenciones: ' + error.message);
    }
};

// -----------------------------------------------------
// 3. ACTUALIZAR Mantención (U)
// -----------------------------------------------------
exports.updateMantencion = async (req, res) => {
    const { id } = req.params;
    const { id_maquina, fecha, tipo, descripcion, responsable, costo } = req.body;

    // Validación: debe haber al menos un campo para actualizar
    if (!id_maquina && !fecha && !tipo && !descripcion && !responsable && costo === undefined) {
        return res.status(400).send('No hay datos para actualizar.');
    }

    try {
        const query = `
            UPDATE mantenciones 
            SET id_maquina = ?, fecha = ?, tipo = ?, descripcion = ?, responsable = ?, costo = ? 
            WHERE id_mantencion = ?
        `;
        const [result] = await db.query(query, [id_maquina, fecha, tipo, descripcion, responsable, costo, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Registro de mantención no encontrado.');
        }

        res.status(200).send('Registro de mantención actualizado con éxito.');
    } catch (error) {
        console.error('Error al actualizar mantención:', error);
        res.status(500).send('Error interno del servidor al actualizar mantención: ' + error.message);
    }
};

// -----------------------------------------------------
// 4. ELIMINAR Mantención (D)
// -----------------------------------------------------
exports.deleteMantencion = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM mantenciones WHERE id_mantencion = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Registro de mantención no encontrado.');
        }

        res.status(200).send('Registro de mantención eliminado con éxito.');
    } catch (error) {
        console.error('Error al eliminar mantención:', error);
        res.status(500).send('Error interno del servidor al eliminar mantención: ' + error.message);
    }
};