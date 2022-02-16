//usaremos el driver nativo node-postgres, instalado como npm i pg.

//importamos la clase CLient de pg

const { Client } = require('pg');

//crearemos una nueva instancia de la clase Client a la que le daremos
//los valores, host, port, user, password,database, definidos en nuestro
//docker-compose.yml


async function getConnection(){
  const client = new Client({
    host:'localhost',
    port: 5432,
    user: 'miguel',
    password: 'ad23',
    database: 'my_store'
  });
  await client.connect();
  return client;
}


module.exports = getConnection;



