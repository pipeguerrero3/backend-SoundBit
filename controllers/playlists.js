const { response } = require("express");
const { Playlist } = require("../models");

const obtenerPlaylists = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, playlists] = await Promise.all([
    Playlist.countDocuments(query),
    Playlist.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    playlists,
  });
};

const obtenerPlaylist = async (req, res = response) => {
  const { id } = req.params;
  const playlist = await Playlist.findById(id).populate("usuario", "nombre");

  res.json(playlist);
};

const crearPlaylist = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const playlistDB = await Playlist.findOne({ nombre });

  if (playlistDB) {
    return res.status(400).json({
      msg: `La playlist ${playlistDB.nombre} ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const playlist = new Playlist(data);

  // Guardar DB
  await playlist.save();

  res.status(201).json(playlist);
};

const actualizarPlaylist = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const playlist = await Playlist.findByIdAndUpdate(id, data, { new: true });

  res.json(playlist);
};

const borrarPlaylist = async (req, res = response) => {
  const { id } = req.params;
  const playlistBorrada = await Playlist.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(playlistBorrada);
};

module.exports = {
  crearPlaylist,
  obtenerPlaylists,
  obtenerPlaylist,
  actualizarPlaylist,
  borrarPlaylist,
};
