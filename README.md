# 🌳 Sistema de Gestión de Mantenciones Forestales (Evaluación N°3 - T13041)

## 📝 Descripción del Sistema

Este es el backend de una aplicación web diseñada para la **Gestión de Mantenciones de Maquinaria** dentro de una empresa del sector forestal y logístico.

## 💻 Tecnologías Utilizadas

* **Framework Backend:** Node.js con Express
* **Base de Datos:** MySQL (a través de `mysql2`)
* **Entorno BD:** Contenedor Docker (Puerto 3307)
* **Seguridad:** bcrypt, express-session.

## 🔌 Instrucciones de Ejecución Inicial

1.  Asegurar que el contenedor MySQL esté corriendo.
2.  Instalar dependencias: `npm install`
3.  Crear el archivo `.env` con las credenciales correctas.
4.  Iniciar el servidor: `node server.js`