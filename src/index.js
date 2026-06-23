import express from "express";
import path from "node:path";
import express from "express";
import cors from "cors";
import 'dotenv/config';

// Configurar el servidor

// Variable que representa el servidor

const server = express();

// Arrancamos el server

const port = 4000;
server.listen(port, () => {
  console.log(`El servidor se ha iniciado en <http://localhost:${port}/>`);
});

// Configurar endpoints = rutas?

server.get("/", (req, res) => {
  res.send("Contenido cambiado otra vez");
});