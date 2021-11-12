const mongoose = require("mongoose");

const conexionBD = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB,
      { useNewUrlParser: true },
      (err, resp) => {
        if (err) throw err;
        console.log("Base de datos online");
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos");
  }
};

module.exports = {
  conexionBD,
};
