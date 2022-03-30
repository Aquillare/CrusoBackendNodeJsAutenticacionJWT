const routerApi = require('./routes');
const passport = require('passport');
const config = require('./config/config');

//importamos cors
const cors = require('cors');

//importamos las estrategias de auth
//const passportStrategies = require('./utils/auth');

//importamos la libreria fileupload, para trabajr con archivos
const fileupload = require('express-fileupload');


//importamos express
const express = require('express');


//inicializamos una varibale que contenga a express
const app = express();

//importamos los middleware para el manejo de errores.
const {logErrors, errorHandler,boomErrorHandler, ormErrorHandler} = require('./middleware/error.handler');

//importamos middleware de verificacion
const {checkApiKey} = require('./middleware/auth.handler');
const passportStrategies = require('./utils/auth');


//este middleware nos servira para poder recibir informacion que nos envien en formate json, por ejemplo
//cuando se use el metodo post para crear un producto
app.use(express.json());


//incializamos una variable con el puerto donde queremos que corra nuestra aPP
//si hay una avriable de entorno para el puerto la tomara, si no usara el puerto 3000.
const puerto = process.env.PORT ||3000;



//inicializamos una variable que contenga un array con los dominios permitidos
const whiteList = ['http://localhost:5500','http://localhost:3000','http://localhost:3001',process.env.WHITE_POINT_ONE, process.env.WHITE_POINT_TWO];

//establecemos un objeto con la configuracion para cors.
const options = {
  origin:(origin, callback) => {
    if(whiteList.includes(origin) || !origin){
      callback(null,true);
    }else{
      callback(new Error('No Permitido'))
    }
  }
}


//cors
app.use(cors(options));

//passport strategies




//definimos un ruta mediante el metodo get de express, el metodo get recibe la ruta como primer
//argumento y como sgundo un callback con el que definimos la respuesta para
//nuestro cliente, este calbback recibe dos parametros request y response.

app.get('/', (req,res) => {

  res.send('Hello world, this is my first server in express');

  //send es un metodo de responde
});

//creamos otra ruta, next

app.get('/nueva-ruta', checkApiKey ,(req,res) => {
  res.send('This is a new Route whit express');
})

//creemos otra ruta mas, tambien podemos enviar mediante el rsponse un objeto json, esto sera
//lo que mas enviaremos ya que crearemos un Api para comunicar datos al frontend.


//debemos inicializar el middlevare de passport
app.use(passport.initialize());

passportStrategies();

//inicializamos el middleware de fileupload , le pasamos un objeto de conifguracion que
//Establece que los archvios se guardaran temporalmente en una carpeta mientras se procesa
//la solicitud para subirlos a la nube, luego se borran de la carpeta temporal.
app.use(fileupload({
  tempFileDir: '/temp',
}));


//llamamos a routerApi y le pasamos como argumento la variable app que contiene a express();
routerApi(app);

//lammamos a los middlewares mediante app.use, es importante llamarlos en orden.
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);







//ahora para que todo esto funcione le decimos a express en que puerto escuchar, podemos pasar
//un segundo argumento al metodo listen que sea un callback en este caso nos devulve un console.log
//para saber que se esta ejecutando, recordemos que esto es para produccion en desarrollo no deben haber console.log s

app.listen(puerto, () =>{
  console.log(`listening in port ${puerto}`);
});

//ahora para correr esta app podemos usar el script configurado en neustro package.json para desarrollo



