const express = require("express");
const { conexionBD } = require( '../database/config' );

class Server {
  constructor() {
    this.usuariosPath = "/api/usuarios"
    this.app = express();
    this.port = process.env.PORT;
    this.conectarBD();
  }

  async conectarBD() {
    await conexionBD();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
