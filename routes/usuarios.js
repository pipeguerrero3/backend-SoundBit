const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id").custom(existeUsuarioPorId),
    check("id", "No es un ID válido").isMongoId(),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    // check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    check("id").custom(existeUsuarioPorId),
    check("id", "No es un ID válido").isMongoId(),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
