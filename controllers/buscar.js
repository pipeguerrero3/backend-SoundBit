const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { Usuario, Playlist, Cancion } = require("../models");

const coleccionesPermitidas = ["usuarios", "playlists", "canciones", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); // TRUE

  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarPlaylists = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); // TRUE

  if (esMongoID) {
    const playlist = await Playlist.findById(termino);
    return res.json({
      results: playlist ? [playlist] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const playlists = await Playlist.find({ nombre: regex, estado: true });

  res.json({
    results: playlists,
  });
};

const buscarCanciones = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); // TRUE

  if (esMongoID) {
    const cancion = await Cancion.findById(termino).populate(
      "playlist",
      "nombre"
    );
    return res.json({
      results: cancion ? [cancion] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const canciones = await Cancion.find({
    nombre: regex,
    estado: true,
  }).populate("playlist", "nombre");

  res.json({
    results: canciones,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "playlists":
      buscarPlaylists(termino, res);
      break;
    case "canciones":
      buscarCanciones(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Busqueda no encontrada",
      });
  }
};

module.exports = {
  buscar,
};
