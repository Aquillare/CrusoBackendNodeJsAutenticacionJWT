const passport = require('passport');

const localStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

function passportStrategies(){

  passport.use(localStrategy);
  passport.use(JwtStrategy);

}

module.exports = passportStrategies;
