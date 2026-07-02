import mysql from "mysql2/promise";
import "dotenv/config";
export const getConexion = async () => {
  const datosConexion = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_SCHEMA,
  };

  const conexion = await mysql.createConnection(datosConexion);
  await conexion.connect();

  return conexion;
};
