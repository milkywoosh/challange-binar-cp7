const e = require('express');
const path = require('path');
const { User, Room, History, sequelize } = require('../../models');
const { suitFunction } = require('./logic-suit');

let firstMove = '';
let secondMove = '';
let firstInput = '';
let storeScore = [];
let objs = [];
// loadtest -c 200 --rps 100 -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJiYWdhczIiLCJpYXQiOjE2MzE1MzcwNjV9.DRxClReFBh1vEfiu-viM7l8p0zAJLFOKTxQrQnuFJ-0" http://localhost:4000/api/auth/whoami


module.exports = {

    homePage: (req, res, next) => {

        res.render('index-cp3', { user: '' })

    },

    homePageLogged: (req, res, next) => {
        // const { username } = req.params;
        const { username } = req.body;
        User.findOne({
            where: {
                username: username,
            }
        })
            .then(data => {
                // res.render('index-cp3', { user: data.username, userstatus: data.role })
                res.send({ message: data })
            })
            .catch(err => {
                res.send({ message: err.message });
            })

        // const currentUser = req.user;


        //    res.send(currentUser);
    },

    whoami: (req, res) => {

        const currentUser = req.user;
        const { id, username, role } = currentUser;


        History.findAll({
            where: {
                player_id: id
            },
            attributes: [
                'id',
                'room_id',
                'result',
                'createdAt'
            ],
        })
            .then(data => {
                res.send({ id, username, role, history: data })
            })
            .catch(err => {
                res.send({ message: err.message })
            })
    },

    createRoom: (req, res) => {
        const { id, username, role } = req.user;

        Room.generate(req.body.name)
            .then(_room => {
                res.send({ room: _room, user: username, role: role });
            })
            .catch(err => {
                res.send({ message: `${err.message}. Maybe name is duplicate.` });
            })
    },

    gameSuit: (req, res, next) => {
        // logic suit !!!!
        // res.render('index-cp4')
        const currentUser = req.user;

        if (firstMove) {
            console.log('firstmove: ', firstMove.username)
            if (firstMove.id != currentUser.id) {
                secondMove = currentUser
                console.log('secondMove: ', secondMove.username)
                secondInput = req.body.option;
                let hasilSuit = suitFunction(firstInput, secondInput);
                if (hasilSuit === 'draw') {
                    storeScore.push({
                        [firstMove.id]: 0,
                        [secondMove.id]: 0,
                        ['winner']: 'draw'
                    })

                } else if (hasilSuit === 'player 1') {
                    storeScore.push({
                        [firstMove.id]: 1,
                        [secondMove.id]: 0,
                        ['winner']: parseInt([firstMove.id])
                    })

                } else if (hasilSuit === 'player 2') {
                    storeScore.push({
                        [firstMove.id]: 0,
                        [secondMove.id]: 1,
                        ['winner']: parseInt([secondMove.id])
                    })

                }
                firstMove = ''
                secondInput = ''

                if (storeScore.length === 3) {
                    let tmp = storeScore;
                    // console.log(objs)
                    function countingResult(obj) {
                        // let result = [0, 0]
                        let result = {
                            win: null,
                            lose: null,
                        }

                        let i;
                        for (i = 0; i < obj.length; i++) {
                            // console.log( 'winner ', obj[i]['winner'])
                            // console.log('Obj Keys ', parseInt(Object.keys( obj[i] )[0]))
                            if (obj[i]['winner'] == parseInt(Object.keys( obj[i] )[0])) {
                                result[0] += 1;
                            } else if (obj[i]['winner'] == parseInt(Object.keys(obj[i])[1])) {
                                result[1] += 1;
                            }
                        }
                        return result;
                    }
                    let tes = countingResult(tmp)
                    console.log(tes);
                    storeScore = [];
                    // res.send({ last_result: tmp });
                    res.send({ last_result: tes });
                } else {
                    res.send({ skor_sementara: storeScore });
                }
            } else {
                res.send({ arahan: 'sudah main, sekarang mohon tunggu giliran' })
            }
        } else {
            firstMove = currentUser
            console.log('firstmove: ', firstMove.username)
            firstInput = req.body.option;
            res.send({ arahan: 'anda tunggu giliran' })
        }

        //  player 1 play gantian
        //  player 2 play

        //  3 times, bergantian
        //  tiap selesai 
        //  {
        //      id p1: [1, 1, 1]
        //      id p2: [0, 0, 0]
        //  },
        //  {
        //      winner_id: 
        //  }




        // kalo belum ada, ubah jadi id playernya, save input player itu.

    },

    refreshGame: (req, res, next) => {
        res.sendFile('popNotif.html', {
            // where is path of popNotif ??? the following
            root: path.join(__dirname, '../../static/cp-4')
        })
    },

    seeDashboard: (req, res, next) => {
        const { id, username, role } = req.user;
        res.send({
            message: "is Authorized to see dashboard",
            name: username,
            role: role
        });

    }
}
