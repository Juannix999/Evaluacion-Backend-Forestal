🌳 [TI3041] BACKEND: SISTEMA DE GESTIÓN DE MANTENCIONES FORESTALES

Este repositorio contiene la solución para la Evaluación N°3: Programación Backend de INACAP, enfocada en simular un encargo real para una empresa del rubro forestal/logístico en la Región del Biobío.

El sistema implementa una API RESTful para la gestión de activos (Maquinaria) y sus intervenciones (Mantenciones), cumpliendo rigurosamente con todos los criterios de seguridad, sesiones y operaciones CRUD requeridos.

💻 1. Arquitectura y Tecnologías

El proyecto fue desarrollado utilizando una arquitectura modular, separando controladores, rutas y configuración, como se evidencia en la estructura de directorios.

Componente

Tecnología

Propósito

Criterio Cumplido

Backend

Node.js con Express

Servidor de aplicación y API RESTful.

Arquitectura Ordenada

Base de Datos

MySQL (Servidor Docker)

Persistencia de datos industriales.

Conexión a BD Industrial

Seguridad

bcrypt

Hashing seguro de contraseñas.

Contraseñas con Hash

Sesiones

express-session

Manejo de estado de usuario (Login/Logout).

Implementa Sesiones

Configuración

dotenv

Uso de variables de entorno para credenciales.

Buenas Prácticas de Seguridad

📊 2. Modelo de Datos (Esquema MySQL)

El sistema opera sobre dos entidades operacionales (Maquinaria y Mantenciones) y una entidad de seguridad (Usuarios), relacionadas mediante claves primarias y foráneas.

-- TABLA 1: Usuarios (Seguridad)
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena_hash VARCHAR(255) NOT NULL, -- Almacena el hash de bcrypt
    rol VARCHAR(20) NOT NULL DEFAULT 'operario' -- 'administrador' o 'operario'
);

-- TABLA 2: Maquinaria (Entidad Operacional 1 - CRUD)
CREATE TABLE maquinaria (
    id_maquina INT AUTO_INCREMENT PRIMARY KEY,
    patente VARCHAR(10) NOT NULL UNIQUE,
    tipo VARCHAR(50) NOT NULL, 
    horas_uso DECIMAL(10, 2) NOT NULL,
    ubicacion VARCHAR(100)
);

-- TABLA 3: Mantenciones (Entidad Operacional 2 - CRUD)
CREATE TABLE mantenciones (
    id_mantencion INT AUTO_INCREMENT PRIMARY KEY,
    id_maquina INT NOT NULL,  
    fecha DATE NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    descripcion TEXT,
    responsable VARCHAR(100),
    costo DECIMAL(10, 2) NOT NULL,
    
    FOREIGN KEY (id_maquina) REFERENCES maquinaria(id_maquina) -- Relación 1:N
);


🔑 3. Requisitos de Seguridad y Sesiones

El sistema cumple con la seguridad mediante:

Registro y Login: El controlador /controllers/authController.js usa bcrypt para el hashing de contraseñas y express-session para crear sesiones.

Protección de Rutas: El middleware isAuthenticated se aplica a todas las rutas CRUD de Maquinaria y Mantenciones, asegurando que solo usuarios válidos puedan acceder.

Autorización (Roles): El middleware isAdmin se aplica a las operaciones sensibles (POST, PUT, DELETE), restringiendo su uso solo al rol administrador.

🚀 4. Instrucciones de Ejecución

Sigue estos pasos para levantar el proyecto y la base de datos:

A. Configuración de la Base de Datos (Docker)

Asegúrate de que Docker Desktop esté corriendo.

Ejecuta el contenedor de MySQL (puerto 3307):

docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=password_segura -p 3307:3306 -d mysql/mysql-server:latest


Accede al contenedor para crear la base de datos forestal_db y las tres tablas (usuarios, maquinaria, mantenciones) usando los comandos SQL provistos en la sección 2. Modelo de Datos.

B. Configuración del Servidor Node.js

Instala las dependencias del proyecto:

npm install


Crea el archivo .env en la raíz con las credenciales usadas en Docker:

DB_HOST=localhost
DB_USER=root  
DB_PASSWORD=password_segura 
DB_NAME=forestal_db
DB_PORT=3307 
SESSION_SECRET=una_clave_secreta_fuerte


Inicia el servidor backend:

node server.js


El servidor Express se iniciará en http://localhost:3000.

C. Endpoints Importantes (Ejemplos)

Endpoint

Método

Descripción

Requisito

/auth/register

POST

Crea un nuevo usuario (rol: 'administrador' o 'operario').

Seguridad

/auth/login

POST

Inicia la sesión.

Sesiones

/api/maquinaria

POST

Registra nueva maquinaria.

CRUD (Maquinaria)

/api/mantenciones

GET

Lista todos los registros de mantención.

CRUD (Mantenciones)

/auth/protected

GET

Prueba si la sesión está activa.

Protección de Rutas

📜 5. Log de Commits (4 Mínimos)

El proyecto fue desarrollado de forma progresiva, tal como lo demuestran los siguientes commits:

feat: Configuración inicial de Express, conexión a MySQL (db.js) y variables de entorno.

feat: Implementación de login con bcrypt (hash) y sistema de sesiones y rutas protegidas.

feat: CRUD completo para la entidad Maquinaria (1ra entidad operacional).

feat: CRUD completo para Mantenciones (2da entidad operacional) y finalización de funcionalidad CRUD requerida.