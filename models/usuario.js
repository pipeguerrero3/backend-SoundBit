const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String, // Tipo de dato
    required: [true, "El nombre es obligatorio"], // required lanza un error en caso tal de que no se coloque el nombre
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true, // Lanza un error en caso tal de que hayan varios usuarios con un mismo correo electrónico
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    require: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"], // Enumeración
  },
  estado: {
    type: Boolean,
    default: true, // Valor por defecto
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// No se usa función de flecha porque se necesita usar el this
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject(); // Se extrae de la instancia los atributos __v y password para que no sea reflejados en la respuesta JSON. Los demás atributos se almacenan en usuario por medio del operador rest (...)
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
