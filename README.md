<p align="center">
  <img src="https://nodejs.org/static/images/logo.svg" width="150" alt="Node.js Logo" />
</p>

<p align="center">
  Backend del <strong>Sistema de Selección Docente</strong> desarrollado para la Unidad Académica Cochabamba - EMI.
</p>

<p align="center">
  <a href="https://nodejs.org" target="_blank"><img src="https://img.shields.io/badge/Node.js-22.11.0-green.svg" alt="Node.js Version" /></a>
  <a href="https://expressjs.com/" target="_blank"><img src="https://img.shields.io/badge/Express.js-Backend-lightgrey.svg" alt="Express.js" /></a>
  <a href="https://www.mongodb.com/" target="_blank"><img src="https://img.shields.io/badge/MongoDB-Database-brightgreen.svg" alt="MongoDB" /></a>
  <a href="https://camunda.com/" target="_blank"><img src="https://img.shields.io/badge/Camunda-Workflow-blue.svg" alt="Camunda" /></a>
</p>

---

## 📋 Descripción

Este backend proporciona las funcionalidades esenciales del sistema de selección docente, incluyendo autenticación, gestión de postulaciones, calificaciones por fases, integración con firma digital mediante Jacobitus y automatización de flujos con Camunda.

## 🔧 Instalación

```bash
# Clona el repositorio y accede al directorio backend
$ cd backend
$ npm install
```

## 🚀 Ejecución

```bash
# Modo desarrollo
$ npm run dev

# Modo producción
$ npm start
```

## 🧪 Pruebas (si están configuradas)

```bash
# Tests unitarios
$ npm run test
```

## ⚙️ Variables de entorno necesarias (.env)

```env
PORT=5000
MONGO_URI=mongodb://...
FRONTEND_URL=http://localhost:3000
FRONTEND_URL_localhost=http://localhost:3000
REQUISITOS_DIR=C:\ruta\a\documentos
FIRMA_DIR=C:\ruta\a\firmas
```

## 🧩 Rutas principales

- `/usuarios`
- `/postulaciones`
- `/api/concurso-meritos`
- `/api/examen-conocimientos`
- `/api/examen-competencias`
- `/api/upload-file` (firma digital)
- `/api/workflow`

## ✍️ Autor

**Rodrigo Harold Mendez Prado**  
Escuela Militar de Ingeniería – Unidad Académica Cochabamba

## 📄 Licencia

Proyecto académico con fines educativos. Todos los derechos reservados.
