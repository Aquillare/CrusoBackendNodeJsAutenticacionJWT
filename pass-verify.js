const bcrypt = require('bcrypt');

async function verifyPassword(){
  const myPassword = '49hh.#pass';
  const hash = '$2b$10$MbymFX0lMvKqrMeROl57RudaqVJTMMwA.CqYLgBdo8THMJnK1OyXq';
  const isMatch = await bcrypt.compare(myPassword ,hash);
  console.log(isMatch);
}

verifyPassword();
//output true
