const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const User = require('../models/user');
const secretKey=process.env.SECRETKEY;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
};

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwtPayload, done) {
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

passport.use(jwtStrategy);
module.exports = passport;