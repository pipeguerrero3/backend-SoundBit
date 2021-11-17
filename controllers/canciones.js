const { response } = require("express");
const { Cancion } = require("../models");

const obtenerCanciones = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, canciones] = await Promise.all([
    Cancion.countDocuments(query),
    Cancion.find(query)
      .populate("usuario", "nombre")
      .populate("playlist", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    canciones,
  });
};

const obtenerCancion = async (req, res = response) => {
  const { id } = req.params;
  const cancion = await Cancion.findById(id)
    .populate("usuario", "nombre")
    .populate("playlist", "nombre");

  res.json(cancion);
};

const crearCancion = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const cancionDB = await Cancion.findOne({ nombre: body.nombre });

  if (cancionDB) {
    return res.status(400).json({
      msg: `La canción ${cancionDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  const cancion = new Cancion(data);

  // Guardar DB
  await cancion.save();

  res.status(201).json(cancion);
};

const actualizarCancion = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario._id;

  const cancion = await Cancion.findByIdAndUpdate(id, data, { new: true });

  res.json(cancion);
};

const borrarCancion = async (req, res = response) => {
  const { id } = req.params;
  const cancionBorrada = await Cancion.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(cancionBorrada);
};

module.exports = {
  crearCancion,
  obtenerCanciones,
  obtenerCancion,
  actualizarCancion,
  borrarCancion,
};
