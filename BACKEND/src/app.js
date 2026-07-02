import express from "express";
import cors from "cors";
import doctorwhoRoutes from "./routes/doctorwhoRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
const app = express();

app.use(cors());
app.use(express.json({ limit: "25Mb" }));

// rutas principales
app.use("/api/doctorwho", doctorwhoRoutes);

// ruta base
app.get("/", (req, res) => {
  res.send("¡Funciona!");
});

// rutas desconocidas
app.get("/api/doctorwho/:type", (req, res) => {
  res.status(400).send("¡Falta el ID! Prueba con /api/doctorwho/:type/:id");
});

app.get(/.*/, (req, res) => {
  res.status(404).send("Página no encontrada :(");
});
app.use(errorMiddleware);
export default app;
