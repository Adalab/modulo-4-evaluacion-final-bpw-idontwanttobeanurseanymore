# Doctor Who API Project

Este proyecto proporciona una API RESTful básica construida con Node.js, Express y MySQL para gestionar información sobre los personajes de la serie **Doctor Who** (doctores, compañeros, enemigos y planetas). El frontend consume esta API mediante peticiones HTTP asíncronas (`fetch`).

---

## 🛠️ Requisitos Previos e Instalación

### 1. Clonar el repositorio e instalar dependencias
Asegúrate de estar en el directorio raíz del proyecto y ejecuta el siguiente comando para instalar las dependencias de Node.js:
```bash
npm install
```

### 2. Configurar la Base de Datos
El proyecto requiere una base de datos MySQL llamada `doctorwho`. En la carpeta [data] se encuentran los scripts SQL necesarios para inicializarla:
1. Ejecuta primero [doctorwho_database.sql] en tu gestor de MySQL (por ejemplo, MySQL Workbench) para crear el esquema de base de datos y sus tablas.
2. Ejecuta después [doctorwho_data.sql] para poblar las tablas con los datos iniciales de la serie.

### 3. Configurar variables de entorno (.env)
En la carpeta [BACKEND] hay un archivo [.env] configurado con las credenciales por defecto:
```env
MYSQL_HOST=''
MYSQL_PORT=3306
MYSQL_PASSWORD=''
MYSQL_USER=''
MYSQL_SCHEMA=''
PORT=4000
```

### 4. Arrancar el Servidor
Para iniciar la API en modo de desarrollo con recarga automática, ejecuta desde el directorio raíz del proyecto:
```bash
npm run dev
```
El servidor se iniciará en: `http://localhost:4000` (o el puerto que hayas configurado en el `.env`).

---

## 📡 Documentación de la API

La API cuenta con los siguientes endpoints disponibles:

### 1. Comprobar Estado del Servidor
* **Ruta:** `GET /`
* **Descripción:** Permite verificar si la API está en funcionamiento.
* **Respuesta (Texto plano):**
  ```text
  Ok
  ```

### 2. Obtener lista de Doctores
* **Ruta:** `GET /api/doctorwho`
* **Descripción:** Obtiene un listado con los nombres de todos los doctores almacenados en la base de datos.
* **Respuesta (JSON):**
  ```json
  [
    {
      "nombre": "Ninth Doctor"
    },
    {
      "nombre": "Tenth Doctor"
    }
  ]
  ```

### 3. Crear un nuevo Doctor
* **Ruta:** `POST /api/doctorwho`
* **Descripción:** Añade un nuevo doctor a la tabla `doctors`.
* **Headers:** `Content-Type: application/json`
* **Cuerpo de la petición (JSON):**

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
* **Respuesta en caso de éxito (JSON):**
  ```json
  {
    "success": true
  }
  ```
* **Respuesta en caso de error (JSON):**
  ```json
  {
    "success": false,
    "error": { ... }
  }
  ```

### 4. Actualizar un Doctor (Simulado)
* **Ruta:** `PUT /api/doctorwho/:id`
* **Descripción:** Simula la actualización de datos de un personaje específico.
* **Headers:** `Content-Type: application/json`
* **Respuesta (JSON):**
  ```json
  {
    "message": "Personaje 9 actualizado",
    "data": {
      "nombre": "Doctores actualizados"
    }
  }
  ```

### 5. Eliminar un Doctor (Simulado)
* **Ruta:** `DELETE /api/doctorwho/:id`
* **Descripción:** Simula la eliminación de un personaje específico.
* **Respuesta (JSON):**
  ```json
  {
    "message": "Personaje 9 eliminado"
  }
  ```

---

## 🖥️ Ejemplos de Consumo en Cliente (JavaScript Fetch)

### Obtener doctores (GET)
```javascript
fetch('http://localhost:4000/api/doctorwho')
  .then(res => res.json())
  .then(data => console.log('Doctores:', data))
  .catch(err => console.error('Error al obtener doctores:', err));
```

### Crear un doctor (POST)
```javascript
const nuevoDoctor = {
  id_doctor: 16,
  nombre: 'Sixteenth Doctor',
  actor: 'Actor Name',
  numero: 16,
  temporada_inicio: 2026,
  temporada_fin: 2027
};

fetch('http://localhost:4000/api/doctorwho', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(nuevoDoctor)
})
  .then(res => res.json())
  .then(data => console.log('Creación:', data))
  .catch(err => console.error('Error al crear doctor:', err));
```

---
