const bcrypt = require('bcrypt');

async function hashPassword(){
  const password = '49hh.#pass';
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
}

hashPassword();
//output $2b$10$MbymFX0lMvKqrMeROl57RudaqVJTMMwA.CqYLgBdo8THMJnK1OyXq
