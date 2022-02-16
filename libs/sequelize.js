const { Sequelize } = require('sequelize');
const  config  = require('../config/config');
const setupModels = require('../db/models');

const options = {
  dialect: 'postgres',
  logging : config.isProd ?  false : true,
};

if(config.isProd) {
  options.ssl = {
    rejectUnauthorized: false
  }
};

//creamos una instancia de sequelize
const sequelize = new Sequelize(config.dbUrl, { options });

// establecemos la configuracion de neustros moddelosde tablas.
setupModels(sequelize);




module.exports = sequelize;


//La clase sequelize ya implementa el metodo de pol
//debemos pasarle la url URI y un objeto que contendra
//una propiedad dialect con un string como valor.
//este string sera el tipo de base de dato .

//la propiedad logging con valor true la establecemos,
//para qeu cada vez que hagamos una consulta, podamos
//ver en consola el equivalente de esa peticion en
//lenguaje sql.
