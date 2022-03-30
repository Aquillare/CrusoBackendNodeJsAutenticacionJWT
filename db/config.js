//definimos la configuracion de conexion a la DB para migraciones

const config  = require('../config/config');

//definimos el exports que contendra ambiente de desarrollo y de produccion.

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl:{
        rejectUnauthorized : false
      }
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl:{
        rejectUnauthorized : false
      }
    }
  },
}

