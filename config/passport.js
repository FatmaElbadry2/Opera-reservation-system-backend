const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const env = require('../config/env');


// Role based authentication using passport
module.exports.Auth = (passport) => {
    let opts ={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = env.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findByPk(jwt_payload._id).then(user => {
            return done(null, user);
        }).catch(err => {
            return done(err, false)
        });
    }))
};

module.exports.Roles = (roles) => {
    return (req, res, next) => {
        if (roles.indexOf(req.user.role) == 0){
            return next()
        }else{
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next("Unauth")
        }
    }
};





module.exports.ManagerRoles = (roles) => {
    return (req, res, next) => {
        if (req.user.role ==2){
            return next()
        }else{
            res.status(401).json({error: 'You are not authorized to view this content',
        message:String(req.user.role)
    });
            return next("Unauth")
        }
    }
};