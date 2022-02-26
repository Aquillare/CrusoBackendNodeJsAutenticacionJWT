const Strategy = require('passport-jwt').Strategy;
const ExtratcJwt = require('passport-jwt').ExtractJwt;

const config = require('../../../config/config');

const options = {
  jwtFromRequest: ExtratcJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;
