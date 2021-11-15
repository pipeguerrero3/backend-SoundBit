const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_CNN,
      {
        useNewUrlParser: true,
      },
      (err, resp) => {
        if (err) throw err;
        console.log("Base de datos ONLINE");
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicializar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
