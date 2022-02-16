//importamos la instancia ValidatorHandlwer de sequelize que nos permitira verificar si
//un error es de tipo ORM
const { ValidationError } = require('sequelize');

//declaramos nuestro middleware de error que usaremos de forma global.

function logErrors(err, req, res, next){
    console.log(err);
    next(err);
}

//declaramos otro middleware de error, este recibira el error y le dara formato para enviarlo al cliente.

function errorHandler (err, req, res, next){  //es importante colocar siempre el next entre los parametros cuando es un
                                             //un middleware de error, asi no usemos el next en el cuerpo.
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

//declaramos un middleware para recibir los errores de tipo boom

function boomErrorHandler (err, req, res, next){
 if(err.isBoom){  //los errores de tipo boom posee la propiedad isBoom que nos ayuda a identificar si son de tipo boom.
  const {output} = err; //boom posee una propiedad output donde guarda la informacion del error.
    res.status(output.statusCode).json( //en la propiedad uotput boom pose un atributo statusCode que posee el codigod e estado.
      output.payload    //en la propiedad output boom posee un atributo payload que posee el json con le mensaje a enviar.
    );
 }else{
   next(err); //si no es de tipo boomm con next ejecutamos el siguiente middleware que maneja los errores normales.
 }

}
 //declaramos un middleware para recibir los errores de ORM, provenientes de la DB

 function ormErrorHandler (err, req, res, next){
   if(err instanceof ValidationError ){
     res.status(409).json({
       statusCode: 409,
       message: err.message,
       errors: err.errors
     });
   }else{
    next(err);
   }
  }



module.exports={logErrors, errorHandler, boomErrorHandler, ormErrorHandler}
