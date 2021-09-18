// watchout when importing !
const { User, Room, History } = require('../models');

let playedFirst = '';
let playedFirstInput = '';
let ronde = 1;
let resultArray = [];

function suit(player, comp) {
    // kalo sama, draw
    if (player === comp) return "draw"

    // kalo beda, ...
    else if (player === "gunting") {

        //  normal if-else
        if (comp === "kertas") return "player 1"
        else if (comp !== "kertas") return "player 2"

        // ternary operator
        // return (comp === "kertas") ? "player 1" : "computer"
    }
    else if (player === "batu") {
        return comp === "kertas" ? "player 2" : "player 1"
    }
    else if (player === "kertas") {
        return comp === "batu" ? "player 1" : "player 2"
    }
}

const parse = (data) => {
    const res = {};
    data.forEach((item) => {
        Object.keys(item).map(key => {
            if (!res[key]) {
                res[key] = item[key]
            } else {
                res[key] += item[key]
            }
        })
    })
    return res;
}

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
                res.send(data)

            })
            .catch(err => {
                res.send({ message: err.message });
            })

    },
    whoami: (req, res) => {
        const currentUser = req.user;
        const { id, username } = currentUser
        let history = [];
        res.send({ id, username, history })
    },
    createRoom: (req, res) => {
        Room.generate(req.body.name)
            .then(_room => {
                res.send(_room)
            })
            .catch(err => {
                res.send({ message: `${err.message}. Maybe name is duplicate.` });
            })
    },
    fight: (req, res) => {
        const currentPlayer = req.user;
        // cek playedFirst ada gak?
        if (playedFirst) {
            // kalo ada, udah ada player yang main duluan.
            // Jaga jangan bolehin player itu main dulu.
            if (currentPlayer.id === playedFirst.id && playedFirstInput) {
                res.send('lo udah main sabar')
            } else {
                const playedSecondInput = req.body.option;
                let hasilSuit = suit(playedFirstInput, playedSecondInput)
                if (hasilSuit === "draw") {
                    resultArray.push({
                        [playedFirst.id]: 0,
                        [currentPlayer.id]: 0
                    })
                } else if (hasilSuit === "player 1") {
                    resultArray.push({
                        [playedFirst.id]: 1,
                        [currentPlayer.id]: 0
                    })
                } else if (hasilSuit === "player 2") {
                    resultArray.push({
                        [playedFirst.id]: 0,
                        [currentPlayer.id]: 1
                    })
                }

                playedFirst = '';
                playedFirstInput = '';
                if (ronde === 3) {
                    const cleanData = parse(resultArray);
                    const { roomID } = req.params;
                    let keys = Object.keys(cleanData)
                    History.create({
                        player_id: parseInt(keys[0]),
                        room_id: parseInt(roomID),
                        result: cleanData[keys[0]]
                    })
                        .then(() => {
                            History.create({
                                player_id: parseInt(keys[1]),
                                room_id: parseInt(roomID),
                                result: cleanData[keys[1]]
                            })
                                .then(() => {
                                    const temp = resultArray;
                                    resultArray = [];
                                    temp.push({ winner_id: cleanData[keys[1]] > cleanData[keys[0]] ? parseInt(keys[1]) : parseInt(keys[0]) })
                                    res.send(temp)
                                })
                                .catch(e => {
                                    console.log('eeeea', e)
                                })
                        })
                        .catch(e => {
                            console.log('eeeeo', e)
                        })
                } else {
                    ronde++;
                    res.send(resultArray)
                }
            }
        }
        // kalo belum ada, ubah jadi id playernya, save input player itu.
        else {
            playedFirst = currentPlayer;
            playedFirstInput = req.body.option;
            res.send('waiting for other player input')
        }
    },
}
