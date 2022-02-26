const jwt = require('jsonwebtoken');

//este secret debe estar como una variable de entorno
//a manera de ejemplo lo colocamos en el codigo
const secret = 'myCat';

const payload = {
  sub: 1,
  role: 'customer'
}

function signToken(payload, secret){
  return jwt.sign(payload, secret);
}

const token = signToken(payload,secret);
console.log(token);

//outpu
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0NTU3ODA3M30.2CmyPImE_FnrFV1b5VvtSXT1cQoT3-OJYxVngqHw1FA
