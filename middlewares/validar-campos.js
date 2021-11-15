const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next(); // Si no hay errores, esta función permite seguir al siguiente middleware. Si no hay más middleware entonces sigue con el controlador.
};

module.exports = {
  validarCampos,
};
