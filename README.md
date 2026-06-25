# 🌌 Doctor Who API Project

Este proyecto proporciona una API RESTful construida con Node.js, Express y MySQL para gestionar información del universo de **Doctor Who**.

El desarrollo actual se centra en la entidad de “Doctores”, aunque la arquitectura está preparada para ampliarse con nuevas entidades como compañeros, enemigos y planetas en futuras iteraciones.

---

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
└── README.md
```


## 🧰 Tecnologías utilizadas

- Node.js
- Express
- MySQL
- React
- Vite
- JavaScript (ES6+)

---

## 🛠️ Instalación y configuración

### 🔧 Clonar el repositorio e instalar dependencias

Asegúrate de estar en el directorio raíz del proyecto y ejecuta los siguientes comando para instalar las dependencias de Node.js y arrancar el proyecto:

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
El **servidor** se iniciará en: `http://localhost:4000` (o el puerto `PORT` definido en `.env`).

El **proyecto** se iniciará en: `http://localhost:5173` (o en el puerto que haya disponible)

### 💾 Configurar la Base de Datos MySQL

El proyecto requiere una base de datos MySQL llamada `doctorwho`. En la carpeta `data` se encuentran los scripts SQL necesarios para inicializarla:

1. Importa `doctorwho_database.sql` en tu gestor de MySQL (por ejemplo, MySQL Workbench) para crear el esquema de base de datos y sus tablas.
2. Importa después `doctorwho_data.sql` para añadir todos los datos a las tablas.

### ⚙️ Configurar variables de entorno (.env)

En la carpeta `backend` hay un archivo `.env `configurado con las credenciales por defecto que, por motivos de seguridad, no verás. Tiene esta estructura:

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

### 👨‍⚕️ Obtener lista de Doctores

- **Ruta:** `GET /api/doctorwho`
- **Descripción:** Obtiene un listado con todos los doctores almacenados en la base de datos.
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

### ➕ Crear un nuevo Doctor

- **Ruta:** `POST /api/doctorwho`
- **Descripción:** Añade un nuevo doctor a la tabla `doctors`.
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

### ✏️ Actualizar un Doctor

- **Ruta:** `PUT /api/doctorwho/:id`
- **Descripción:** Simula la actualización de datos de un personaje específico.
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

- **Ruta:** `DELETE /api/doctorwho/:id`
- **Descripción:** Elimina un personaje específico.
- **Respuesta** (JSON):

  ```json
  {
    "message": "Personaje 9 eliminado"
  }
  ```

---

## 🖥️ Ejemplos de Consumo en Cliente

### ⚠️ Notas importantes

Recuerda instalar e importar las bibliotecas necesarias:
```
npm i express
npm i cors
npm i mysql2 dotenv
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

