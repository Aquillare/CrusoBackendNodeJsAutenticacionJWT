const jwt = require('jsonwebtoken');

//colocamos el valor de la variable secret y el token a manera
//de ejemplo , pero no deberian estar de esta forma sino como
//variables de ambiante

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0NTU3ODA3M30.2CmyPImE_FnrFV1b5VvtSXT1cQoT3-OJYxVngqHw1FA'

function verifyToken(token, secret){
  return jwt.verify(token, secret);
};

const payload = verifyToken(token, secret);
console.log(payload);

//output
//{ sub: 1, role: 'customer', iat: 1645578073 }
