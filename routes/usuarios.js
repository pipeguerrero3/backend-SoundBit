const { Router } = require("express");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios.controllers");

const router = Router();

router.get("/", usuariosGet);
router.put("/", usuariosPut);
router.post("/", usuariosPost);
router.delete("/", usuariosDelete);

module.exports = router;
