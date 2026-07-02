import * as model from "../models/doctorwhoModel.js";
import { ApiError } from "../utils/ApiError.js";

export const search = async (req, res) => {
  const data = await model.searchDoctors(req.query.q);
  res.json(data);
};

export const getAll = async (req, res) => {
  const data = await model.getAllData();
  res.json({ success: true, data });
};

export const getByTypeAndId = async (req, res) => {
  const { type, id } = req.params;

  const data = await model.getByTypeAndId(type, id);

  if (!data) {
    throw new ApiError("No encontrado", 404);
  }

  res.json({ success: true, data });
};

export const create = async (req, res) => {
  const { type } = req.params;

  const success = await model.create(type, req.body);

  if (!success) {
    throw new ApiError("No se pudo crear el recurso", 400);
  }

  res.json({ success: true });
};

export const update = async (req, res) => {
  const { type, id } = req.params;

  const result = await model.update(type, id, req.body);

  if (!result) {
    throw new ApiError(`No se encontró ningún ${type} con el ID ${id}`, 404);
  }

  res.json({
    success: true,
    message: `${type} actualizado correctamente`,
    data: req.body,
  });
};

export const remove = async (req, res) => {
  const { type, id } = req.params;

  const result = await model.remove(type, id);

  if (!result) {
    throw new ApiError(`No se encontró ningún ${type} con el ID ${id}`, 404);
  }

  res.json({
    success: true,
    message: `${type} eliminado correctamente`,
  });
};
