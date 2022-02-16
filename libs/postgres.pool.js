//importamos la clase Pool de pg.

const { Pool } = require('pg');

//importamos archivo de configuracion para lectura de
//variables de entorno.
const config = require('../config/config');

let URI = '';

if(config.isProd){
  URI = config.dbUrl;
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);

  const URI =`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}


//creamos una nueva instancia de la clase con los datos
//requeridos para establecer la conexion con la base de
//datos.

const pool = new Pool({ connectionString: URI });

module.exports = pool;
