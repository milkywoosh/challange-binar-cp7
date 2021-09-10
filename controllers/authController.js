// watchout when importing !
const { User } = require('../models');
// const passport = require('passport');


// function format(idk) {
//     const { id, username } = idk
//     return {
//         id,
//         username,
//         accessToken: idk.generateToken()
//     }
// }

module.exports = {
    // register process
    register: (req, res, next) => {
        //  { username, password } in register params in user-jwt-bcrypt
        User.register(req.body)
            .then((cek) => {
                if (cek) {
                    res.redirect('/api/login')
                } else {
                    res.send({ message: "something wrong" })
                }

                // HANDLE ERROR SAAT INPUT USERNAME SAMA???
            })
            .catch(err => next(err))
    },

    // login process
    login: (req, res) => {

        User.authenticate(req.body)
            .then(authResult => {
                console.log(authResult)
                // res.json(
                //     format(authResult)
                // )
                const { id, username } = authResult
                const data = {
                    id,
                    username,
                    token: authResult.generateToken()
                }
                res.send(data)

            })
            .catch(err => {
                res.send({message: err.message});
            })
            
    }
}