import "dotenv/config";
import express from "express";
import path from "node:path";
import cors from "cors";
import mysql from "mysql2/promise";
//Intenta dividir el código del servidor en varios ficheros siguiendo, por ejemplo, una arquitectura MVC.

// Configurar el servidor
const server = express();

// Configuración para que funcione como API RESTful (json)
server.use(cors()); // API pública
server.use(express.json({ limit: "25Mb" }));

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
//un poco flojo: Si no están bien los datos de conexión, el servidor falla y da katacroker y se queda parado.
//No es buena idea poner el nombre del schema/base de datos en las instrucciones SQL porque entondes no nos vale para nada el valor de la configuración de la conexión.
//Quizá es un buen punto verificar la conexión con la base de datos cuando el servidor arranca y mostrar un error en la consola y pararlo si no se puede conectar.

//ENDPOINTS (method+path) doctorwho
server.get("/", (req, res) => {
  res.send("¡Funciona!");
});

//SEARCH
server.get("/api/doctorwho/search", async (req, res) => {
  const conexion = await getConexion();
  try {
    const querySearch = req.query.q;
    const querySearchDoctors = `
      SELECT id_doctor, nombre, actor, numero, temporada_inicio, temporada_fin
      FROM doctorwho.doctors
      WHERE nombre LIKE ?
    `;
    const [result] = await conexion.query(querySearchDoctors, [
      `%${querySearch}%`,
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//GET personajes
server.get("/api/doctorwho", async (req, res) => {
  let conexion;
  try {
    conexion = await getConexion();
    const queryDoctors = ` 
      SELECT 
        id_doctor, 
        nombre, 
        actor, 
        numero, 
        temporada_inicio, 
        temporada_fin
      FROM doctorwho.doctors
    `;
    const [doctors] = await conexion.query(queryDoctors);

    const queryCompanions = `
      SELECT 
        id_companion, 
        nombre, 
        actor,
        temporada_inicio,
        temporada_fin
      FROM doctorwho.companions
    `;
    const [companions] = await conexion.query(queryCompanions);

    const queryEnemies = `
      SELECT 
        id_enemigo, 
        nombre,
        alive,
        fecha_muerte
      FROM doctorwho.enemies
    `;
    const [enemies] = await conexion.query(queryEnemies);

    // PLANETS
    const queryPlanets = `
      SELECT 
        id_planeta,
        nombre,
        destroyed
      FROM doctorwho.planets
    `;
    const [planets] = await conexion.query(queryPlanets);

    res.json({
      success: true,
      data: {
        doctors,
        companions,
        enemies,
        planets,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    if (conexion) {
      await conexion.end();
    }
  }
});

//GET doctor, companion, enemy

server.get("/api/doctorwho/:type/:id", async (req, res) => {
  let conexion;

  try {
    const { type, id } = req.params;
    conexion = await getConexion();
    //DOCTOR (y todas sus relaciones)
    if (type === "doctor") {
      // 1. Doctor
      const [doctorRows] = await conexion.query(
        `
        SELECT 
          id_doctor, nombre, actor, numero, temporada_inicio, temporada_fin
        FROM doctorwho.doctors
        WHERE id_doctor = ?
        `,
        [id],
      );

      if (doctorRows.length === 0) {
        return res.status(404).json({ error: "Doctor no encontrado" });
      }

      const doctor = doctorRows[0];

      // 2. Companions
      const [companions] = await conexion.query(
        `
        SELECT 
          c.id_companion,
          c.nombre,
          c.actor,
          dhc.rol,
          dhc.estado_final,
          dhc.relacion_con_doctor,
          dhc.numero_episodios
        FROM doctorwho.companions c
        JOIN doctorwho.doctor_has_companions dhc 
          ON c.id_companion = dhc.id_companion
        WHERE dhc.id_doctor = ?
        `,
        [id],
      );

      // 3. Enemies
      const [enemies] = await conexion.query(
        `
        SELECT 
          e.id_enemigo,
          e.nombre,
          dhe.numero_enfrentamientos,
          dhe.resultado_final,
          dhe.nivel_peligro,
          dhe.tipo_conflicto
        FROM doctorwho.enemies e
        JOIN doctorwho.doctor_has_enemies dhe 
          ON e.id_enemigo = dhe.id_enemigo
        WHERE dhe.id_doctor = ?
        `,
        [id],
      );

      // 4. Planets
      const [planets] = await conexion.query(
        `
        SELECT 
          p.id_planeta,
          p.nombre,
          p.destroyed,
          dhp.numero_visitas,
          dhp.primera_visita,
          dhp.ultima_visita,
          dhp.evento_clave,
          dhp.planeta_estado_post,
          dhp.importancia
        FROM doctorwho.planets p
        JOIN doctorwho.doctor_has_planets dhp 
          ON p.id_planeta = dhp.id_planeta
        WHERE dhp.id_doctor = ?
        `,
        [id],
      );

      return res.json({
        success: true,
        data: {
          doctor,
          companions,
          enemies,
          planets,
        },
      });
    }

    //COMPANIONS
    else if (type === "companion") {
      const [rows] = await conexion.query(
        `
        SELECT 
          id_companion,
          nombre,
          actor,
          temporada_inicio,
          temporada_fin
        FROM doctorwho.companions
        WHERE id_companion = ?
        `,
        [id],
      );

      return res.json({
        success: true,
        data: rows[0] || null,
      });
    }

    //ENEMIES
    else if (type === "enemy") {
      const [rows] = await conexion.query(
        `
        SELECT 
          id_enemigo,
          nombre,
          alive,
          fecha_muerte
        FROM doctorwho.enemies
        WHERE id_enemigo = ?
        `,
        [id],
      );

      return res.json({
        success: true,
        data: rows[0] || null,
      });
    }

    //PLANETS
    else if (type === "planet") {
      const [rows] = await conexion.query(
        `
        SELECT 
          id_planeta,
          nombre,
          destroyed
        FROM doctorwho.planets
        WHERE id_planeta = ?
        `,
        [id],
      );

      return res.json({
        success: true,
        data: rows[0] || null,
      });
    }

    // ERROR TYPE
    else {
      return res.status(400).json({
        success: false,
        error: "Type inválido. Usa: doctor | companion | enemy | planet",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  } finally {
    if (conexion) await conexion.end();
  }
});

//POST
//No ponas el id en los INSERT y deja que la base de datos asigne uno con el AUTO_INCREMENT. Y, como respuesta del servidor al POST, devuelve un objeto con el ID que se ha insertado (como lo tienes está bien, pero fuerzas al FrontEnd que lleve la cuenta de los ID y se puede confundir).
server.post("/api/doctorwho/:type", async (req, res) => {
  let conexion;

  try {
    const { type } = req.params;

    conexion = await getConexion();

    let insertData;
    let values;

    if (type === "doctor") {
      insertData = `
        INSERT INTO doctorwho.doctors 
        (id_doctor, nombre, actor, numero, temporada_inicio, temporada_fin)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      values = [
        req.body.id_doctor,
        req.body.nombre,
        req.body.actor,
        req.body.numero,
        req.body.temporada_inicio,
        req.body.temporada_fin,
      ];
    } else if (type === "companion") {
      insertData = `
        INSERT INTO doctorwho.companions
        (id_companion, nombre, actor)
        VALUES (?, ?, ?)
      `;

      values = [req.body.id_companion, req.body.nombre, req.body.actor];
    } else if (type === "enemy") {
      insertData = `
        INSERT INTO doctorwho.enemies
        (id_enemigo, nombre)
        VALUES (?, ?)
      `;

      values = [req.body.id_enemigo, req.body.nombre];
    } else {
      return res.status(400).json({
        success: false,
        error:
          "¡Vaya! Parece que esta página no existe. Prueba doctor | companion | enemy",
      });
    }

    const [resultadoInsert] = await conexion.execute(insertData, values);

    if (resultadoInsert.affectedRows === 1) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    if (conexion) await conexion.end();
  }
});

//PUT
//Añade la cláusula `LIMIT 1` en las sentencias UPDATE y DELETE para evitar catástrofes.
server.put("/api/doctorwho/:type/:id", async (req, res) => {
  let conexion;

  try {
    const { type, id } = req.params;

    conexion = await getConexion();

    let queryUpdate;
    let values;

    if (type === "doctor") {
      const { nombre, actor, numero, temporada_inicio, temporada_fin } =
        req.body;

      queryUpdate = `
        UPDATE doctorwho.doctors
        SET nombre = ?, actor = ?, numero = ?, temporada_inicio = ?, temporada_fin = ?
        WHERE id_doctor = ?
      `;

      values = [nombre, actor, numero, temporada_inicio, temporada_fin, id];
    } else if (type === "companion") {
      const { nombre, actor } = req.body;

      queryUpdate = `
        UPDATE doctorwho.companions
        SET nombre = ?, actor = ?
        WHERE id_companion = ?
      `;

      values = [nombre, actor, id];
    } else if (type === "enemy") {
      const { nombre } = req.body;

      queryUpdate = `
        UPDATE doctorwho.enemies
        SET nombre = ?
        WHERE id_enemigo = ?
      `;

      values = [nombre, id];
    } else {
      return res.status(400).json({
        success: false,
        error: "type no válido. Usa: doctor | companion | enemy",
      });
    }

    const [resultado] = await conexion.execute(queryUpdate, values);

    if (resultado.affectedRows === 1) {
      res.json({
        success: true,
        message: `${type} con ID ${id} actualizado correctamente.`,
        data: req.body,
      });
    } else {
      res.status(404).json({
        success: false,
        error: `No se encontró ningún ${type} con el ID ${id} para actualizar.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  } finally {
    if (conexion) await conexion.end();
  }
});

//DELETE
server.delete("/api/doctorwho/:type/:id", async (req, res) => {
  let conexion;

  try {
    const { type, id } = req.params;

    conexion = await getConexion();

    let resultado;

    //DOCTOR
    if (type === "doctor") {
      const queryDeleteRelationsCompanions = `
        DELETE FROM doctorwho.doctors_has_companions 
        WHERE doctors_id_doctor = ?
      `;

      const queryDeleteRelationsEnemies = `
        DELETE FROM doctorwho.doctors_has_enemies 
        WHERE doctors_id_doctor = ?
      `;

      const queryDeleteRelationsPlanets = `
        DELETE FROM doctorwho.doctors_has_planets 
        WHERE doctors_id_doctor = ?
      `;

      await conexion.execute(queryDeleteRelationsCompanions, [id]);
      await conexion.execute(queryDeleteRelationsEnemies, [id]);
      await conexion.execute(queryDeleteRelationsPlanets, [id]);

      const queryDeleteDoctor = `
        DELETE FROM doctorwho.doctors 
        WHERE id_doctor = ?
      `;

      [resultado] = await conexion.execute(queryDeleteDoctor, [id]);
    }

    //COMPANION
    else if (type === "companion") {
      const queryDeleteCompanion = `
        DELETE FROM doctorwho.companions
        WHERE id_companion = ?
      `;

      [resultado] = await conexion.execute(queryDeleteCompanion, [id]);
    }

    //ENEMY
    else if (type === "enemy") {
      const queryDeleteEnemy = `
        DELETE FROM doctorwho.enemies
        WHERE id_enemigo = ?
      `;

      [resultado] = await conexion.execute(queryDeleteEnemy, [id]);
    } else {
      return res.status(400).json({
        success: false,
        error: "type no válido. Usa: doctor | companion | enemy",
      });
    }

    //RESPONSE
    if (resultado.affectedRows === 1) {
      res.json({
        success: true,
        message: `${type} con ID ${id} eliminado correctamente.`,
      });
    } else {
      res.status(404).json({
        success: false,
        error: `No se encontró ningún ${type} con el ID ${id}.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  } finally {
    if (conexion) await conexion.end();
  }
});

//Rutas desconocidas
server.get("/api/doctorwho/:type", (req, res) => {
  res.status(400).send("¡Falta el ID! Prueba con /api/doctorwho/:type/:id");
});

server.get(/.*/, (req, res) => {
  //GET http://localhost:4000/*
  res.status(404).send("Página no encontrada :(");
});
