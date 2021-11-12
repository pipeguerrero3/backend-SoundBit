const express = require("express");
const cors = require("cors");
const { conexionBD } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    // Conexión a BD
    this.conectarBD();

    this.middlewares();

    this.routes();
  }

  async conectarBD() {
    await conexionBD();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    // ?
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
