const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')

var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}



module.exports = (passport) => {
    passport.use(new JwtStrategy(options, async (payload, done) => {

        try {
            const user = await User.findById(payload.userId).select('email _id')
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
            // res.status(200).send()
        } catch (error) {
            // res.status(400).send({

            // })
            console.log(error)
        }



    }))
};