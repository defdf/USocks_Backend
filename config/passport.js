const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStratedy = passportJwt.Strategy;
const config = require('../config/main');
const User = require('../models/user');
const Op = require('sequelize').Op;

module.exports = function (passport) {
    const jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = config.secretKey;
    passport.use(new JwtStratedy(jwtOptions, function (jwtPayload, done) {
        User.findOne({
            where: {
                [Op.or]: [
                    {username: jwtPayload.username},
                    {email: jwtPayload.email}
                ]
            }
        }).then(appUser=>{
            if (appUser){
                done(null, appUser)
            } else {
                done(null, false, {message: 'Invalid JWT, could not find user.'})
            }
        }).catch(error=>{
            done(error, false, {message: 'There was an error searching or a user.'})
        })
    }))
};