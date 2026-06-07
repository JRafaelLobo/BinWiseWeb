# BinWise

Sistema web para gestión de reciclaje inteligente, gamificación y educación ambiental.

---

# Descripción

BinWise es una plataforma desarrollada con:

- Backend: NestJS + TypeORM + MySQL
- Frontend: React + Vite + TypeScript
- Base de datos: MySQL 8
- Contenedores: Docker + Docker Compose

El sistema permite:

- Registro e inicio de sesión de usuarios
- Clasificación de residuos
- Registro de reciclaje
- Sistema de puntos y niveles
- Sistema de recompensas
- Estadísticas de reciclaje
- Documentación Swagger
- Contenerización completa con Docker

---

# Tecnologías utilizadas

## Backend

- NestJS
- TypeORM
- MySQL2
- JWT Authentication
- Passport
- Swagger
- Class Validator

## Frontend

- React
- Vite
- TypeScript

## Infraestructura

- Docker
- Docker Compose
- MySQL 8

---

# Estructura del proyecto
```
.
├── documentacion
├── backend
├── frontend
├── mysql
└── docker-compose.yml
```
---

# Requisitos

Antes de ejecutar el proyecto necesitás:

- Docker
- Docker Compose
- Node.js 22+ (opcional para ejecución local)

---

# Variables de entorno MySQL

mysql/mysql.env

MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=binwise
MYSQL_USER=binwise_user
MYSQL_PASSWORD=binwise_password

---

# Variables de entorno Backend

backend/.env

DB_HOST=mysql
DB_PORT=3306
DB_USER=binwise_user
DB_PASSWORD=binwise_password
DB_NAME=binwise

JWT_SECRET=mysecretkey
JWT_EXPIRES_IN=1d

---

# Ejecución con Docker

Desde la raíz del proyecto:

docker compose up --build

---

# Detener contenedores

docker compose down

---

# Eliminar volúmenes y reiniciar base de datos

docker compose down -v

---

# URLs del proyecto

Frontend:
http://localhost:5173

Backend:
http://localhost:3000

Swagger:
http://localhost:3000/api

MySQL:
localhost:3307

---

# Base de datos

La base de datos se inicializa automáticamente usando:

- mysql/1-schema.sql
- mysql/2-data.sql

---

# Scripts Backend

Ubicación:
backend/

Desarrollo:

npm run start:dev

Producción:

npm run build
npm run start:prod

Tests:

npm run test

---

# Scripts Frontend

Ubicación:
frontend/

Desarrollo:

npm run dev

Build:

npm run build

---

# Funcionalidades

## Autenticación

- Registro de usuarios
- Login con JWT
- Protección de rutas

## Reciclaje

- Registro de residuos reciclados
- Historial de reciclaje
- Cálculo de puntos

## Gamificación

- Sistema de niveles
- Puntos acumulados
- Progreso de usuario

## Recompensas

- Desbloqueo automático de recompensas
- Historial de logros

## Educación ambiental

- Módulos educativos
- Recomendaciones de reciclaje

---

# Swagger

El backend expone documentación automática usando Swagger:

http://localhost:3000/api

---

# Problemas comunes

## Error de conexión MySQL

ECONNREFUSED mysql:3306

Solución:

docker compose down -v
docker compose up --build

---

## Hot reload no funciona

Agregar en docker-compose.yml:

CHOKIDAR_USEPOLLING: "true"

---

Proyecto desarrollado para gestión y educación ambiental mediante reciclaje inteligente.
