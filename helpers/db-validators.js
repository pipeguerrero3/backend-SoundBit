const Usuario = require("../models/usuario");

const emailExiste = async (correo = "") => {
  // Verificando si existe el correo...
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya está vínculado a una cuenta`);
    /* return res.status(400).json({
      error: "El correo ya está vinculado a una cuenta",
    }); */
  }
};

const existeUsuarioPorId = async (id = "") => {
  // Verificando si existe la contraseña...
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe`);
  }
};

module.exports = {
  emailExiste,
  existeUsuarioPorId,
};
