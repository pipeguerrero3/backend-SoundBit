const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos } = require("../middlewares");

const {
  crearPlaylist,
  obtenerPlaylists,
  obtenerPlaylist,
  actualizarPlaylist,
  borrarPlaylist,
} = require("../controllers/playlists");
const { existePlaylistPorId } = require("../helpers/db-validators");

const router = Router();

/**
 * {{url}}/api/playlists
 */

//  Obtener todas las playlists - publico
router.get("/", obtenerPlaylists);

// Obtener una playlist por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existePlaylistPorId),
    validarCampos,
  ],
  obtenerPlaylist
);

// Crear playlist - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearPlaylist
);

// Actualizar - privado - cualquiera con token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existePlaylistPorId),
    validarCampos,
  ],
  actualizarPlaylist
);

// Borrar - privado - cualquiera con token válido
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existePlaylistPorId),
    validarCampos,
  ],
  borrarPlaylist
);

module.exports = router;
