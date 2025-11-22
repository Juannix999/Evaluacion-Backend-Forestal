// config/db.js

const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración del Pool de Conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // Usa el puerto 3307
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función de prueba de conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("🟢 Conexión a MySQL exitosa a la base de datos: " + process.env.DB_NAME);
    connection.release();
  } catch (error) {
    console.error("🔴 Error de conexión a MySQL:", error.message);
  }
}

testConnection();

module.exports = pool;