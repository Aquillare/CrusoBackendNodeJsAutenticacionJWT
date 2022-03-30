//Configuracion base para leer las variables de entorno.

//requerimos dontevn para poder leer las variables de entorno
require('dotenv').config();


const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production' ,
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER ,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  emailAccount: process.env.EMAIL_ACCOUNT,
  emailPassword: process.env.EMAIL_PASSWORD,
  cloudEndpoint: process.env.CLOUD_FILES || '',
  bucketName: process.env.BUCKET_NAME || '',
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID || '',
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY || '',
 };

 module.exports = config;
