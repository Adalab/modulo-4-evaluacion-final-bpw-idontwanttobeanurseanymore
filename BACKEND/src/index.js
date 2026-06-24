import 'dotenv/config';
import express from "express";
import path from "node:path";
import cors from "cors";
import mysql from "mysql2/promise"

// Configurar el servidor
const server = express();

// Configuración para que funcione como API RESTful (json)
server.use(cors()); // API pública
server.use(express.json({ limit: "25Mb" }));

// Configuramos Express para que use EJS:
//server.set("view engine", "ejs");

// Arrancamos
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`El servidor se ha iniciado en <http://localhost:${port}/>`);
});

// Configuración de MySQL

const getConexion = async () => {
  const datosConexion = {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_SCHEMA,
  };

  const conexion = await mysql.createConnection(datosConexion); // Crear la cajita de la conexión en el Workbench
  await conexion.connect(); // Hacer click en la cajita de la conex del Workbench

  return conexion;
};

//ENDPOINTS (method+path) doctorwho

//GET
server.get("/api/doctorwho", async (req, res) => {
  const conexion = await getConexion();
  const queryListDoctors= `
  SELECT doctors.nombre
  FROM doctorwho.doctors
  `
  const [resultado] = await conexion.query(queryListDoctors);
  await conexion.end();
  res.json(resultado)
});

//POST
server.post("/api/doctorwho", async (req, res) => {
  const conexion = await getConexion();
  const insertData = `
  INSERT INTO doctorwho.doctors (id_doctor, nombre, actor, numero, temporada_inicio, temporada_fin)
  VALUES (?, ?, ?, ?, ?)
  `
  const [resultadoInsert] = await conexion.execute(insertData, [
    req.body.id_doctor.
    req.body.nombre,
    req.body.actor,
    req.body.numero,
    req.body.temporada_inicio,
    req.body.temporada_fin,
  ])
  await conexion.end();

  if(resultadoInsert.affectedRows === 0){
    res.json({success:false})
  }else{
    res.json({success: true, id: resultadoInsert.id})
  }
})

/*
server.get("/doctorwho/:id", (req, res) => {
    res.json({ message: `Personaje con id: ${id}` });
});
//Otros GET: 
  // /doctorwho/search 
  // /doctorwho/profile

server.post("/doctorwho", (req, res) => {
  const nuevoPersonaje = req.body;
  res.json({
    message: 'Personaje creado',
    data: nuevoPersonaje
  });
});
//PUT companion, enemigos, planetas

server.put('/doctorwho/doctors/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body;

  res.json({
    message: `Personaje ${id} actualizado`,
    data: datos
  });
});

server.delete('/doctorwho/:id', (req, res) => {
  const id = req.params.id;

  res.json({
    message: `Personaje ${id} eliminado`
  });
});
*/



//Si la ruta no está bien escrita
server.get(/.*/, (req, res) => {
  //GET http://localhost:4000/*
  res.status(404).send("Página no encontrada.");
});

