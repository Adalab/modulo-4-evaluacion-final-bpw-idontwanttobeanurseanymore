# 🌌 Doctor Who API Project

Esta aplicación ha sido desarrollada como proyecto final del **Módulo 4: Express JS y Bases de Datos** del bootcamp de desarrollo web Full Stack & IA de Adalab.

Este proyecto proporciona una API RESTful construida con Node.js, Express y MySQL para gestionar información del universo de **Doctor Who**.

**Allons-y Alonso!**

## 🚀 Funcionalidades

- La aplicación permite realizar búsquedas por nombre, conectando el frontend con el backend mediante **peticiones fetch** y métodos GET. Actualmente únicamente es posible buscar por nombre del doctor, el resto se encuentra en desarrollo.
- Se han implementado correctamente los **endpoints GET, POST, PUT y DELETE**, y han sido probados con **Postman**. Las respuestas de estas pruebas se encuentran en la carpeta `/postman`.
- Se utilizan **variables de entorno** mediante un archivo `.env` para mejorar la seguridad y evitar exponer información sensible.
- La base de datos se gestiona mediante **scripts SQL**.

## 📦 Estructura del proyecto

```
proyecto/
│
├── backend/
│   ├── src/
│   │   └── index.js  # configuración express y endpoints
│   ├── .env
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   └── services/   # llamadas a la API
│   │
│   ├── index.html
│   ├── package.json
│   ├── node_modules/
│   └── public
│
├── data/
│    ├── doctorwho_data.sql
│    └── doctorwho_database.sql
│
├── postman
└── README.md
```

## 🧰 Tecnologías utilizadas

- Node.js
- Express
- MySQL
- React
- Vite
- JavaScript (ES6+)
- Postman

## 🛠️ Instalación y configuración

### 🔧 Clonar el repositorio e instalar dependencias

Clona el repositorio:

```bash
git clone https://github.com/Adalab/modulo-4-evaluacion-final-bpw-idontwanttobeanurseanymore.git
```

Asegúrate de estar en el directorio raíz del proyecto y ejecuta los siguientes comandos para instalar las dependencias de Node.js y arrancar el proyecto:

```bash
# backend
cd backend
npm install
npm run dev

# frontend
cd frontend
npm install
npm run dev
```

El **servidor** se iniciará en: `http://localhost:4000` (o el puerto `PORT` que hayas definido en `.env`).

El **proyecto** se iniciará en: `http://localhost:5173` (o en el puerto que haya disponible)

### 💾 Configurar la Base de Datos MySQL

El proyecto requiere una base de datos MySQL llamada **doctorwho**. En la carpeta `data` se encuentran los scripts SQL necesarios para inicializarla:

1. Importa **`doctorwho_database.sql`** en tu gestor de MySQL (por ejemplo, MySQL Workbench) para crear el esquema de base de datos y sus tablas.
2. Importa **`doctorwho_data.sql`** para añadir todos los datos a las tablas.

### ⚙️ Configurar variables de entorno (.env)

En la carpeta `backend` hay un archivo `.env `configurado con las credenciales que, por motivos de seguridad, no verás. Tiene esta estructura:

```env
MYSQL_HOST=
MYSQL_PORT=
MYSQL_PASSWORD=
MYSQL_USER=
MYSQL_SCHEMA=
PORT=
```

## 📡 Documentación de la API

La API cuenta con los siguientes endpoints disponibles:

```
| Método | Endpoint       | Descripción                |
|--------|----------------|----------------------------|
| GET    | /doctorwho     | Obtener todos los doctores |
| POST   | /doctorwho     | Crear un doctor            |
| PUT    | /doctorwho/:id | Actualizar doctor          |
| DELETE | /doctorwho/:id | Eliminar doctor            |
```

### 🌐 Comprobar Estado del Servidor

- **Ruta:** `GET /`
- **Descripción:** Permite verificar si la API está en funcionamiento.
- **Respuesta**:

  ```text
  ¡Funciona!
  ```

### 👨‍⚕️ Obtener listado de Personajes

- **Ruta:** `GET /api/doctorwho`
- **Descripción:** Obtiene un listado con todos los datos de los personajes almacenados en la base de datos.
- **Respuesta** (JSON):

  ```json
  [
    {
      "id_doctor": 9,
      "nombre": "Ninth Doctor",
      "actor": "Christopher Eccleston",
      "numero": 9,
      "temporada_inicio": 2005,
      "temporada_fin": 2005
    },
    {
      ...
    }
  ]
  ```

### ➕ Crear un nuevo personaje

- **Ruta:** `POST /api/doctorwho/:type`
- **type**: puede ser doctor, companion o enemy
- **Descripción:** Añade un nuevo elemento a la tabla `doctors`.
- **Headers:** `Content-Type: application/json`
- **Cuerpo de la petición** (JSON):

  ```json
  {
    "id_doctor": 16,
    "nombre": "Sixteenth Doctor",
    "actor": "Actor Name",
    "numero": 16,
    "temporada_inicio": 2026,
    "temporada_fin": 2027
  }
  ```

- **Respuesta en caso de éxito** (JSON):
  ```json
  {
    "success": true
  }
  ```
- **Respuesta en caso de error** (JSON):
  ```json
  {
    "success": false,
    "error": { ... }
  }
  ```

### ✏️ Modificar un personaje

- **Ruta:** `PUT /api/doctorwho/:type/:id`
- **type**: puede ser doctor, companion o enemy
- **Descripción:** Actualiza los datos de un personaje específico.
- **Headers:** `Content-Type: application/json`
- **Respuesta** (JSON):

  ```json
  {
    "message": "Personaje 9 actualizado",
    "data": {
      "nombre": "Doctores actualizados"
    }
  }
  ```

### ❌ Eliminar un Doctor

- **Ruta:** `DELETE /api/doctorwho/:type/:id`
- **type**: puede ser doctor, companion o enemy
- **Descripción:** Elimina un personaje específico.
- **Respuesta** (JSON):

  ```json
  {
    "message": "Personaje 9 eliminado"
  }
  ```

**Faltan peticiones por añadir**

---

## 🖥️ Ejemplos de Consumo en Cliente

### ⚠️ Notas importantes

Recuerda instalar e importar las bibliotecas necesarias:

```
npm i express
npm i cors
npm i mysql2
npm i dotenv
```

### Obtener doctores (GET)

```javascript
fetch("http://localhost:4000/api/doctorwho")
  .then((res) => res.json())
  .then((data) => console.log("Doctores:", data))
  .catch((err) => console.error("Error al obtener doctores:", err));
```

### Crear un doctor (POST)

```javascript
const nuevoDoctor = {
  id_doctor: 16,
  nombre: "Sixteenth Doctor",
  actor: "Actor Name",
  numero: 16,
  temporada_inicio: 2026,
  temporada_fin: 2027,
};

fetch("http://localhost:4000/api/doctorwho", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(nuevoDoctor),
})
  .then((res) => res.json())
  .then((data) => console.log("Creación:", data))
  .catch((err) => console.error("Error al crear doctor:", err));
```

---

## ✨ Posibles mejoras

- Se podría ampliar la base de datos añadiendo más datos, tanto en número de filas como en columnas, para enriquecer la información disponible.
- Los endpoints podrían simplificarse y organizarse mejor, separándolos en distintos archivos JavaScript para mejorar la mantenibilidad del código.
  El frontend podría desarrollarse de forma más completa y con una interfaz más elaborada.
- Se podrían implementar pruebas automatizadas utilizando Jest y Supertest para mejorar la fiabilidad de la aplicación.
- El servidor de la API podría desplegarse en servicios como Render, Aiven, Supabase o Vercel para hacerlo accesible en producción.
- Se podría integrar Swagger para documentar la API y facilitar su uso y comprensión.
- Se podría implementar un sistema de autenticación con JWT (JSON Web Tokens), incluyendo funcionalidades de registro e inicio de sesión de usuarios.

## 👩‍💻 Autora

🔗 Si te interesa ver mi evolución a lo largo del Bootcamp, aquí tienes acceso a todos mis proyectos: https://github.com/idontwanttobeanurseanymore

🔗 Si me quieres encontrar en Linkedin:
https://www.linkedin.com/in/martaao/

_Faltan cosas pero no me da tiempo hoy_
