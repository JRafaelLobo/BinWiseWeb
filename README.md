# BinWise

Sistema web para la gestión inteligente de reciclaje, educación ambiental y gamificación orientada a fomentar prácticas sostenibles mediante el uso de tecnologías modernas.

---

# Descripción

BinWise es una plataforma web diseñada para incentivar el reciclaje mediante un sistema de puntos, niveles y recompensas. El sistema permite a los usuarios registrar actividades relacionadas con el reciclaje, consultar su progreso y acceder a contenido educativo ambiental.

La solución está desarrollada utilizando una arquitectura desacoplada basada en:

- **Backend:** NestJS + TypeORM + MySQL
- **Frontend:** React + Vite + TypeScript
- **Base de Datos:** MySQL 8
- **Contenedores:** Docker y Docker Compose
- **Orquestación:** Kubernetes

---

# Características principales

- Registro de usuarios
- Inicio de sesión mediante JWT
- Gestión de perfiles
- Registro de residuos reciclados
- Historial de reciclaje
- Sistema de puntos acumulativos
- Sistema de niveles y progresión
- Desbloqueo de recompensas
- Estadísticas de reciclaje
- Contenido educativo ambiental
- Documentación automática mediante Swagger
- Despliegue mediante Docker y Kubernetes

---

# Tecnologías utilizadas

## Backend

- NestJS
- TypeORM
- MySQL2
- JSON Web Token (JWT)
- Passport
- Swagger/OpenAPI
- Class Validator
- TypeScript

## Frontend

- React
- Vite
- TypeScript
- Axios
- React Router DOM
- Recharts

## Base de Datos

- MySQL 8

## Infraestructura

- Docker
- Docker Compose
- Kubernetes

---

# Estructura del proyecto

```text
.
├── k8s/                    # Archivos de despliegue Kubernetes
├── documentacion/          # Manuales y documentación del proyecto
├── backend/                # API REST desarrollada con NestJS
├── frontend/               # Aplicación web desarrollada con React
├── mysql/                  # Scripts iniciales y configuración de MySQL
└── docker-compose.yml      # Entorno local de desarrollo
```

---

# Requisitos

Antes de ejecutar el proyecto es necesario contar con:

- Docker
- Docker Compose
- Kubernetes (opcional)
- Node.js 22 o superior (opcional para desarrollo local)
- Git

---

# Variables de entorno MySQL

Archivo:

```text
mysql/mysql.env
```

Contenido:

```env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=binwise
MYSQL_USER=binwise_user
MYSQL_PASSWORD=binwise_password
```

---

# Variables de entorno Backend

Archivo:

```text
backend/.env
```

Contenido:

```env
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=binwise

JWT_SECRET=supersecret
JWT_EXPIRES_IN=1d
```

---

# Ejecución local con Docker Compose

Desde la raíz del proyecto ejecutar:

```bash
docker compose up --build
```

El sistema iniciará automáticamente:

- MySQL
- Backend NestJS
- Frontend React

---

# Detener contenedores

```bash
docker compose down
```

---

# Eliminar volúmenes y reiniciar base de datos

```bash
docker compose down -v
```

---

# URLs del proyecto

## Frontend

```text
http://localhost:5173
```

## Backend

```text
http://localhost:3000
```

## Swagger

```text
http://localhost:3000/api
```

## Base de datos MySQL

```text
localhost:3307
```

---

# Inicialización de la base de datos

La base de datos se configura automáticamente mediante los siguientes scripts:

```text
mysql/1-schema.sql
mysql/2-data.sql
```

Estos archivos son ejecutados durante la primera inicialización del contenedor MySQL.

---

# Scripts Backend

Ubicación:

```text
backend/
```

## Desarrollo

```bash
npm install
npm run start:dev
```

## Producción

```bash
npm install
npm run build
npm run start:prod
```

## Testing

```bash
npm run test
```

---

# Scripts Frontend

Ubicación:

```text
frontend/
```

## Desarrollo

```bash
npm install
npm run dev
```

## Compilación para producción

```bash
npm install
npm run build
```

---

# Docker de Producción

El proyecto incluye imágenes Docker optimizadas para entornos productivos.

## Construir Backend

```bash
docker build -f Dockerfile.prod -t usuario/binwiseweb-backend:1.0 .
```

## Construir Frontend

```bash
docker build -f Dockerfile.prod -t usuario/binwiseweb-frontend:1.0 .
```

## Construir Base de Datos

```bash
docker build -f Dockerfile.prod -t usuario/binwiseweb-mysql:1.0 .
```

---

# Publicación en Docker Hub

Iniciar sesión:

```bash
docker login
```

Publicar imágenes:

```bash
docker push usuario/binwiseweb-backend:1.0
docker push usuario/binwiseweb-frontend:1.0
docker push usuario/binwiseweb-mysql:1.0
```

---

# Despliegue en Kubernetes

Los manifiestos Kubernetes se encuentran en:

```text
k8s/
```

Aplicar todos los recursos:

```bash
kubectl apply -f k8s/
```

Verificar despliegues:

```bash
kubectl get deployments
```

Verificar pods:

```bash
kubectl get pods
```

Verificar servicios:

```bash
kubectl get svc
```

Consultar logs:

```bash
kubectl logs deployment/backend
kubectl logs deployment/frontend
kubectl logs deployment/mysql
```

---

# Funcionalidades

## Autenticación

- Registro de usuarios
- Inicio de sesión con JWT
- Protección de rutas
- Gestión de sesiones

## Gestión de Reciclaje

- Registro de residuos reciclados
- Historial de reciclaje
- Consulta de actividad del usuario

## Gamificación

- Sistema de puntos
- Sistema de niveles
- Seguimiento del progreso
- Ranking de participación

## Recompensas

- Desbloqueo automático de logros
- Gestión de recompensas
- Historial de premios obtenidos

## Educación Ambiental

- Material educativo
- Información sobre clasificación de residuos
- Buenas prácticas ambientales

## Estadísticas

- Seguimiento de actividad
- Métricas de reciclaje
- Visualización de resultados

---

# API y Documentación Swagger

La API REST dispone de documentación interactiva generada automáticamente mediante Swagger.

Acceso:

```text
http://localhost:3000/api
```

Desde esta interfaz es posible:

- Consultar endpoints disponibles
- Probar solicitudes
- Visualizar modelos de datos
- Validar respuestas de la API

---

# Problemas comunes

## Error de conexión a MySQL

Error:

```text
ECONNREFUSED mysql:3306
```

Solución:

```bash
docker compose down -v
docker compose up --build
```

También verificar que el contenedor MySQL se encuentre en estado `Running`.

---

## El frontend no se actualiza automáticamente

En algunos sistemas operativos puede ser necesario habilitar el polling de archivos.

Agregar en Docker Compose:

```yaml
environment:
  CHOKIDAR_USEPOLLING: "true"
```

---

## Error al iniciar Kubernetes

Verificar el estado de los pods:

```bash
kubectl get pods
```

Consultar eventos:

```bash
kubectl describe pod <nombre-del-pod>
```

Consultar logs:

```bash
kubectl logs <nombre-del-pod>
```

---

# Licencia

Proyecto desarrollado con fines académicos y educativos para promover la gestión responsable de residuos, el reciclaje inteligente y la educación ambiental mediante tecnologías web modernas.

---

# Autores

**José Rafael Lobo Guardado**
**Josue Andres Ham Alvarez**
**Daniel Alejandro Reyes Alemán**


Proyecto: **BinWise**