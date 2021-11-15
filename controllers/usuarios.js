const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  //const { q, nombre, apikey, page = 1, limit } = req.query;

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  /* const usuarios = await Usuario.find(query)
    .skip(Number(desde)) // skip empiece a mostrar desde el numero que hay en desde
    .limit(Number(limite)); // limit solo muestra la cantidad de registros que hay en limite

  const total = await Usuario.countDocuments(query); */

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol,
  });

  // Encriptando contraseña (hash)...
  const salt = bcryptjs.genSaltSync(); // Vueltas que da el algoritmo para encriptar la contraseña. Entre más vueltas de, más robusto será.
  usuario.password = bcryptjs.hashSync(password, salt); // Encriptando contraseña...

  // En el body podría enviarse información innecesaria e incluso scripts que pueden afectar la seguridad de nuestra aplicación. Se recomienda destructurarlo y sacar los atributos necesarios solamente.
  // En caso tal de que sean muchos atributos se puede destructurar usando el operador rest, lo que traerá únicamente los atributos del modelo.
  // const { nombre, ...resto } = req.body;
  // const usuario = new Usuario(resto);

  // Guardando en BD...
  await usuario.save();

  res.json({
    /* msg: "Post API - controlador", */
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params; // Se obtiene el parámetro id del endpoint de forma dinámica
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO: validar contra base de datos
  if (password) {
    // Encriptando contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "Patch API - controlador",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  // Eliminado físico
  // const usuario = await Usuario.findByIdAndDelete(id);

  // Forma recomendable: actualizando el estado a false para mantener integridad en la BD
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
