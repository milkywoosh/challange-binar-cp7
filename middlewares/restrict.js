/*

FOR WHATT??

*/

// using passport-JWT method
const { passportAdmin, passportPlayer } = require('../lib/passport');

// exported to authRouter.js
module.exports = {
    restrictPlayer: 
        passportPlayer.authenticate('jwt', {
            session: false
        })
    ,
    restrictAdmin:
        passportAdmin.authenticate('jwt', {
            session: false
        })
}


