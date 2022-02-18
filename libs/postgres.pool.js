//importamos la clase Pool de pg.

const { Pool } = require('pg');

//importamos archivo de configuracion para lectura de
//variables de entorno.
const config = require('../config/config');

let URI = '';

const options = {};

if(config.isProd){
  options.conectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: false
  };
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI =`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.conectionString = URI;
}


//creamos una nueva instancia de la clase con los datos
//requeridos para establecer la conexion con la base de
//datos.

const pool = new Pool(options);

module.exports = pool;
