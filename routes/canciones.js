const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos } = require("../middlewares");

const {
  crearCancion,
  obtenerCanciones,
  obtenerCancion,
  actualizarCancion,
  borrarCancion,
} = require("../controllers/canciones");

const {
  existePlaylistPorId,
  existeCancionPorId,
} = require("../helpers/db-validators");

const router = Router();

/**
 * {{url}}/api/canciones
 */

//  Obtener todas las canciones - publico
router.get("/", obtenerCanciones);

// Obtener una cancion por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeCancionPorId),
    validarCampos,
  ],
  obtenerCancion
);

// Crear cancion - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("playlist", "No es un id de Mongo").isMongoId(),
    check("playlist").custom(existePlaylistPorId),
    validarCampos,
  ],
  crearCancion
);

// Actualizar - privado - cualquiera con token válido
router.put(
  "/:id",
  [
    validarJWT,
    // check('cancion','No es un id de Mongo').isMongoId(),
    check("id").custom(existeCancionPorId),
    validarCampos,
  ],
  actualizarCancion
);

// Borrar una cancion - Admin
router.delete(
  "/:id",
  [
    // Borrar - privado - cualquiera con token válido
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeCancionPorId),
    validarCampos,
  ],
  borrarCancion
);

module.exports = router;
