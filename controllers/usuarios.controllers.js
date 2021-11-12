const { response } = require("express");

const usuariosGet = (req, res = response) => {
  res.json({
    msg: "GET API - controlador",
  });
};

const usuariosPost = async (req, res = response) => {
  // VAMOS AQUÍ
  const { nombre, apellido, genero } = req.body;

  res.json({
    msg: "POST API - controlador",
    nombre,
    apellido,
    genero,
  });
};

const usuariosPut = async (req, res = response) => {
  res.json({
    msg: "PUT API - controlador",
  });
};

const usuariosDelete = async (req, res = response) => {
  res.json({
    msg: "DELETE API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
