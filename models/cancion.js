const { Schema, model } = require("mongoose");

const CancionSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  id_spotify: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  playlist: {
    type: Schema.Types.ObjectId,
    ref: "Playlist",
    required: true,
  },
});

CancionSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Cancion", CancionSchema);
