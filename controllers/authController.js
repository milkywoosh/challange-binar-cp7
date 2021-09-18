// watchout when importing !
const { User } = require('../models');



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

        // const currentUser = req.user;

        User.authenticate(req.body)
            .then(authResult => {
                // console.log(authResult)
                // res.json(
                //     format(authResult)
                // )

                const { id, username } = authResult
                const data = {
                    id,
                    username,
                    token: authResult.generateToken()
                }

                // res.redirect(`/api/homepage/${authResult.username}`);
                res.send({ message: data });
            })
            .catch(err => {
                // res.send({ messagessss: er   r.message });
                res.redirect('/api/homepage');


            })

    },




}