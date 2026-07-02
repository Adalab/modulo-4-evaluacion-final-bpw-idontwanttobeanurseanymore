import { getConexion } from "../config/db.js";

export const searchDoctors = async (search) => {
  const conexion = await getConexion();

  const [result] = await conexion.query(
    `     
    SELECT id_doctor, nombre, actor, numero, temporada_inicio, temporada_fin
    FROM doctors
    WHERE nombre LIKE ?
  `,
    [`%${search}%`],
  );

  await conexion.end();
  return result;
};

export const getAllData = async () => {
  const conexion = await getConexion();

  const [doctors] = await conexion.query(`SELECT * FROM doctors`);
  const [companions] = await conexion.query(`SELECT * FROM companions`);
  const [enemies] = await conexion.query(`SELECT * FROM enemies`);
  const [planets] = await conexion.query(`SELECT * FROM planets`);

  await conexion.end();

  return { doctors, companions, enemies, planets };
};

export const getByTypeAndId = async (type, id) => {
  const conexion = await getConexion();

  let result;

  if (type === "doctor") {
    const [doctor] = await conexion.query(
      `SELECT * FROM doctors WHERE id_doctor = ?`,
      [id],
    );

    const [companions] = await conexion.query(`SELECT * FROM companions`);

    result = {
      doctor: doctor[0],
      companions,
    };
  } else if (type === "companion") {
    const [rows] = await conexion.query(
      `SELECT * FROM companions WHERE id_companion = ?`,
      [id],
    );
    result = rows[0];
  } else if (type === "enemy") {
    const [rows] = await conexion.query(
      `SELECT * FROM enemies WHERE id_enemigo = ?`,
      [id],
    );
    result = rows[0];
  } else if (type === "planet") {
    const [rows] = await conexion.query(
      `SELECT * FROM planets WHERE id_planeta = ?`,
      [id],
    );
    result = rows[0];
  }

  await conexion.end();
  return result;
};

export const create = async (type, body) => {
  const conexion = await getConexion();

  let query;
  let values;

  if (type === "doctor") {
    query = `       INSERT INTO doctors (nombre, actor, numero, temporada_inicio, temporada_fin)
      VALUES (?, ?, ?, ?, ?)
    `;
    values = [
      body.nombre,
      body.actor,
      body.numero,
      body.temporada_inicio,
      body.temporada_fin,
    ];
  } else if (type === "companion") {
    query = `       INSERT INTO companions (nombre, actor)
      VALUES (?, ?)
    `;
    values = [body.nombre, body.actor];
  } else if (type === "enemy") {
    query = `       INSERT INTO enemies (nombre)
      VALUES (?)
    `;
    values = [body.nombre];
  }

  const [result] = await conexion.execute(query, values);
  await conexion.end();

  return result.affectedRows === 1;
};

export const update = async (type, id, body) => {
  const conexion = await getConexion();

  let query;
  let values;

  if (type === "doctor") {
    query = `       UPDATE doctors
      SET nombre=?, actor=?, numero=?, temporada_inicio=?, temporada_fin=?
      WHERE id_doctor=? LIMIT 1
    `;
    values = [
      body.nombre,
      body.actor,
      body.numero,
      body.temporada_inicio,
      body.temporada_fin,
      id,
    ];
  } else if (type === "companion") {
    query = `       UPDATE companions
      SET nombre=?, actor=?
      WHERE id_companion=? LIMIT 1
    `;
    values = [body.nombre, body.actor, id];
  } else if (type === "enemy") {
    query = `       UPDATE enemies
      SET nombre=?
      WHERE id_enemigo=? LIMIT 1
    `;
    values = [body.nombre, id];
  }

  const [result] = await conexion.execute(query, values);
  await conexion.end();

  return result.affectedRows === 1;
};

export const remove = async (type, id) => {
  const conexion = await getConexion();

  let result;

  if (type === "doctor") {
    await conexion.execute(
      `DELETE FROM doctors_has_companions WHERE doctors_id_doctor=?`,
      [id],
    );
    await conexion.execute(
      `DELETE FROM doctors_has_enemies WHERE doctors_id_doctor=?`,
      [id],
    );
    await conexion.execute(
      `DELETE FROM doctors_has_planets WHERE doctors_id_doctor=?`,
      [id],
    );

    [result] = await conexion.execute(
      `DELETE FROM doctors WHERE id_doctor=? LIMIT 1`,
      [id],
    );
  } else if (type === "companion") {
    [result] = await conexion.execute(
      `DELETE FROM companions WHERE id_companion=? LIMIT 1`,
      [id],
    );
  } else if (type === "enemy") {
    [result] = await conexion.execute(
      `DELETE FROM enemies WHERE id_enemigo=? LIMIT 1`,
      [id],
    );
  }

  await conexion.end();
  return result.affectedRows === 1;
};
