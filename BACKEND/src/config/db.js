import mysql from "mysql2/promise";

export const getConexion = async () => {
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
