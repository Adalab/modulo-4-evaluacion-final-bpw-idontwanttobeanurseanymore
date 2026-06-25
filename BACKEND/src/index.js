import "dotenv/config";
import express from "express";
import path from "node:path";
import cors from "cors";
import mysql from "mysql2/promise";

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
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_SCHEMA,
  };

  const conexion = await mysql.createConnection(datosConexion);
  await conexion.connect();

  return conexion;
};

//ENDPOINTS (method+path) doctorwho
server.get("/", (req, res) => {
  res.send("¡Funciona!");
});

//GET doctores
server.get("/api/doctorwho", async (req, res) => {
  let conexion;
  try {
    conexion = await getConexion();
    const queryListDoctors = `
        SELECT id_doctor, nombre, actor, numero, temporada_inicio, temporada_fin
        FROM doctorwho.doctors
      `;
    const [resultado] = await conexion.query(queryListDoctors);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    if (conexion) {
      await conexion.end();
    }
  }
});

//GET doctor
server.get("/api/doctors/:id", async (req, res) => {
  let conexion;

  try {
    const { id } = req.params;

    conexion = await getConexion();

    const sqlDoctor = `
      SELECT id_doctor, nombre, actor, numero, temporada_inicio, temporada_fin
      FROM doctorwho.doctors
      WHERE id_doctor = ?
    `;

    const [rows] = await conexion.query(sqlDoctor, [id]);
    res.json(rows[0] || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (conexion) await conexion.end();
  }
});

//POST
server.post("/api/doctorwho", async (req, res) => {
  let conexion;
  try {
    conexion = await getConexion();
    const insertData = `
  INSERT INTO doctorwho.doctors (id_doctor, nombre, actor, numero, temporada_inicio, temporada_fin)
  VALUES (?, ?, ?, ?, ?, ?)
  `;
    const [resultadoInsert] = await conexion.execute(insertData, [
      req.body.id_doctor,
      req.body.nombre,
      req.body.actor,
      req.body.numero,
      req.body.temporada_inicio,
      req.body.temporada_fin,
    ]);

    if (resultadoInsert.affectedRows === 1) {
      res.json({
        success: true,
      });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  } finally {
    if (conexion) {
      await conexion.end();
    }
  }
});

//PUT
server.put("/api/doctorwho/:id", async (req, res) => {
  let conexion;
  try {
    conexion = await getConexion();
    const id = req.params.id;
    const { nombre, actor, numero, temporada_inicio, temporada_fin } = req.body;

    const queryUpdate = `
      UPDATE doctorwho.doctors
      SET nombre = ?, actor = ?, numero = ?, temporada_inicio = ?, temporada_fin = ?
      WHERE id_doctor = ?
    `;

    const [resultado] = await conexion.execute(queryUpdate, [
      nombre,
      actor,
      numero,
      temporada_inicio,
      temporada_fin,
      id,
    ]);

    if (resultado.affectedRows === 1) {
      res.json({
        success: true,
        message: `Doctor con ID ${id} actualizado correctamente.`,
        data: { id, nombre, actor, numero, temporada_inicio, temporada_fin },
      });
    } else {
      res.status(404).json({
        success: false,
        error: `No se encontró ningún doctor con el ID ${id} para actualizar.`,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    if (conexion) {
      await conexion.end();
    }
  }
});

//DELETE
server.delete("/api/doctorwho/:id", async (req, res) => {
  let conexion;
  try {
    conexion = await getConexion();
    const id = req.params.id;

    //Borra relaciones en otras tablas para evitar catakroker
    const queryDeleteRelationsCompanions = `DELETE FROM doctorwho.doctors_has_companions WHERE doctors_id_doctor = ?`;
    const queryDeleteRelationsEnemies = `DELETE FROM doctorwho.doctors_has_enemies WHERE doctors_id_doctor = ?`;
    const queryDeleteRelationsPlanets = `DELETE FROM doctorwho.doctors_has_planets WHERE doctors_id_doctor = ?`;

    await conexion.execute(queryDeleteRelationsCompanions, [id]);
    await conexion.execute(queryDeleteRelationsEnemies, [id]);
    await conexion.execute(queryDeleteRelationsPlanets, [id]);

    //Borrar al doctor
    const queryDeleteDoctor = `DELETE FROM doctorwho.doctors WHERE id_doctor = ?`;
    const [resultado] = await conexion.execute(queryDeleteDoctor, [id]);

    if (resultado.affectedRows === 1) {
      res.json({
        success: true,
        message: `Doctor con ID ${id} ha sido eliminado correctamente.`,
      });
    } else {
      res.status(404).json({
        success: false,
        error: `No se encontró ningún doctor con el ID ${id} para eliminar.`,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    if (conexion) {
      await conexion.end();
    }
  }
});

server.get(/.*/, (req, res) => {
  //GET http://localhost:4000/*
  res.status(404).send("Página no encontrada, prueba a añadir '/api/doctorwho' a tu url");
});
