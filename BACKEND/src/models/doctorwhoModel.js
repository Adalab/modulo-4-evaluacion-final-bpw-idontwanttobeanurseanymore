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
//GET - getAllData
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

//POST - create
export const create = async (type, body) => {
  const conexion = await getConexion();

  let query;
  let values;

  if (type === "doctor") {
    query = `
      INSERT INTO doctors 
      (numero_doctor, nombre, actor, temporada_inicio, temporada_fin, era)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    values = [
      body.numero_doctor,
      body.nombre,
      body.actor,
      body.temporada_inicio,
      body.temporada_fin,
      body.era,
    ];
  } else if (type === "companion") {
    query = `
      INSERT INTO companions 
      (nombre, actor, temporada_inicio, temporada_fin)
      VALUES (?, ?, ?, ?)
    `;
    values = [
      body.nombre,
      body.actor,
      body.temporada_inicio,
      body.temporada_fin,
    ];
  } else if (type === "enemy") {
    query = `
      INSERT INTO enemies 
      (nombre, alive, fecha_muerte)
      VALUES (?, ?, ?)
    `;
    values = [body.nombre, body.alive, body.fecha_muerte];
  } else if (type === "doctor-companion") {
    query = `
      INSERT INTO doctor_has_companions
      (id_doctor, id_companion, temporada_inicio, temporada_fin, rol, estado_final,
      primera_aparicion, ultima_aparicion, numero_episodios, relacion_con_doctor)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    values = [
      body.id_doctor,
      body.id_companion,
      body.temporada_inicio,
      body.temporada_fin,
      body.rol,
      body.estado_final,
      body.primera_aparicion,
      body.ultima_aparicion,
      body.numero_episodios,
      body.relacion_con_doctor,
    ];
  } else if (type === "doctor-enemy") {
    query = `
      INSERT INTO doctor_has_enemies
      (id_doctor, id_enemigo, numero_enfrentamientos, primera_vez, ultima_vez,
      resultado_final, enemigo_derrotado, nivel_peligro, tipo_conflicto)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    values = [
      body.id_doctor,
      body.id_enemigo,
      body.numero_enfrentamientos,
      body.primera_vez,
      body.ultima_vez,
      body.resultado_final,
      body.enemigo_derrotado,
      body.nivel_peligro,
      body.tipo_conflicto,
    ];
  } else if (type === "doctor-planet") {
    query = `
      INSERT INTO doctor_has_planets
      (id_doctor, id_planeta, numero_visitas, primera_visita, ultima_visita,
      evento_clave, planeta_estado_post, importancia)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    values = [
      body.id_doctor,
      body.id_planeta,
      body.numero_visitas,
      body.primera_visita,
      body.ultima_visita,
      body.evento_clave,
      body.planeta_estado_post,
      body.importancia,
    ];
  } else if (type === "planet") {
    query = `
      INSERT INTO planets
      (nombre, destroyed)
      VALUES (?, ?)
    `;
    values = [body.nombre, body.destroyed];
  }

  const [result] = await conexion.execute(query, values);
  await conexion.end();

  return result.affectedRows === 1;
};

//PUT - update
export const update = async (type, id, body) => {
  const conexion = await getConexion();

  let query;
  let values;

  if (type === "doctor") {
    query = `
      UPDATE doctors
      SET numero_doctor=?, nombre=?, actor=?, temporada_inicio=?, temporada_fin=?, numero=?, era=?
      WHERE id_doctor=? LIMIT 1
    `;
    values = [
      body.numero_doctor,
      body.nombre,
      body.actor,
      body.temporada_inicio,
      body.temporada_fin,
      body.numero,
      body.era,
      id,
    ];
  } else if (type === "companion") {
    query = `
      UPDATE companions
      SET nombre=?, actor=?, temporada_inicio=?, temporada_fin=?
      WHERE id_companion=? LIMIT 1
    `;
    values = [
      body.nombre,
      body.actor,
      body.temporada_inicio,
      body.temporada_fin,
      id,
    ];
  } else if (type === "enemy") {
    query = `
      UPDATE enemies
      SET nombre=?, alive=?, fecha_muerte=?
      WHERE id_enemigo=? LIMIT 1
    `;
    values = [body.nombre, body.alive, body.fecha_muerte, id];
  } else if (type === "doctor-companion") {
    query = `
      UPDATE doctor_has_companions
      SET temporada_inicio=?, temporada_fin=?, rol=?, estado_final=?,
          primera_aparicion=?, ultima_aparicion=?, numero_episodios=?, relacion_con_doctor=?
      WHERE id_doctor=? AND id_companion=? LIMIT 1
    `;
    values = [
      body.temporada_inicio,
      body.temporada_fin,
      body.rol,
      body.estado_final,
      body.primera_aparicion,
      body.ultima_aparicion,
      body.numero_episodios,
      body.relacion_con_doctor,
      body.id_doctor,
      body.id_companion,
    ];
  } else if (type === "doctor-enemy") {
    query = `
      UPDATE doctor_has_enemies
      SET numero_enfrentamientos=?, primera_vez=?, ultima_vez=?, resultado_final=?,
          enemigo_derrotado=?, nivel_peligro=?, tipo_conflicto=?
      WHERE id_doctor=? AND id_enemigo=? LIMIT 1
    `;
    values = [
      body.numero_enfrentamientos,
      body.primera_vez,
      body.ultima_vez,
      body.resultado_final,
      body.enemigo_derrotado,
      body.nivel_peligro,
      body.tipo_conflicto,
      body.id_doctor,
      body.id_enemigo,
    ];
  } else if (type === "doctor-planet") {
    query = `
      UPDATE doctor_has_planets
      SET numero_visitas=?, primera_visita=?, ultima_visita=?, evento_clave=?,
          planeta_estado_post=?, importancia=?
      WHERE id_doctor=? AND id_planeta=? LIMIT 1
    `;
    values = [
      body.numero_visitas,
      body.primera_visita,
      body.ultima_visita,
      body.evento_clave,
      body.planeta_estado_post,
      body.importancia,
      body.id_doctor,
      body.id_planeta,
    ];
  } else if (type === "planet") {
    query = `
      UPDATE planets
      SET nombre=?, destroyed=?
      WHERE id_planeta=? LIMIT 1
    `;
    values = [body.nombre, body.destroyed, id];
  }

  if (!query) throw new Error("Tipo no válido");

  const [result] = await conexion.execute(query, values);
  await conexion.end();

  return result.affectedRows === 1;
};

//DELETE - remove
export const remove = async (type, id) => {
  const conexion = await getConexion();

  let query;
  let values;

  if (type === "doctor") {
    query = `
      DELETE FROM doctors
      WHERE id_doctor=? LIMIT 1
    `;
    values = [id];
  } else if (type === "companion") {
    query = `
      DELETE FROM companions
      WHERE id_companion=? LIMIT 1
    `;
    values = [id];
  } else if (type === "enemy") {
    query = `
      DELETE FROM enemies
      WHERE id_enemigo=? LIMIT 1
    `;
    values = [id];
  }

  const [result] = await conexion.execute(query, values);
  await conexion.end();

  return result.affectedRows === 1;
};
