const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const config = require('../config/main');
const User = require('../models/user');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretKey
};

const jwtStratedy = new JwtStrategy(jwtOptions, function (jwtPayload, done) {
    User.findOne({
        where: {username: jwtPayload.username}
    }).then(appUser => {
        if (appUser) {
            done(null, appUser)
        } else {
            done(null, false, {message: 'Invalid JWT, could not find user.'})
        }
    }).catch(error => {
        done(error, false, {message: 'There was an error searching for a user.'})
    })
});

passport.use(jwtStratedy);
module.exports = passport;