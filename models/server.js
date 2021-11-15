const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares - función que siempre se ejecuta cuando se levante el servidor
    this.middlewares();

    // Rutas de la app
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  // Un middleware es una función que se ejecuta antes de llamar un controlador o seguir con la ejecución de las peticiones. el .use define los middlewares.
  middlewares() {
    // CORS
    this.app.use(cors()); // Permite establecer rutas a las cuales autorizar para retornar información desde la API

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
