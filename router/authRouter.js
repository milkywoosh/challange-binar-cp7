const router = require('express').Router();
const auth = require('../controllers/authController');// register and login
const main_page = require('../controllers/main-apps-game/main-apps-controller');

const { restrictPlayer, restrictAdmin } = require('../middlewares/restrict');

// only access dashboard ==> role as "admin" 
router.get('/api/auth-admin/dashboard/:id_player', restrictAdmin, main_page.seeDashboard);
router.get('/api/auth-admin/homepage/', restrictAdmin, main_page.homePageLogged)
router.get('/api/auth-admin/whoami', restrictAdmin, main_page.whoami)
router.post('/api/auth-admin/create-room',restrictAdmin,  main_page.createRoom)




// router.use(restrictPlayer);  
// role as "player"
router.get('/api/auth-player/homepage', restrictPlayer, (req, res) => res.send({message: "tes"})); 
router.get('/api/auth-player/homepage/:username', restrictPlayer, main_page.homePageLogged)
// router.get('/api/refreshGame', main_page.refreshGame);
router.get('/api/auth-player/whoami', restrictPlayer, main_page.whoami)
router.post('/api/auth-player/create-room',restrictPlayer,  main_page.createRoom)
router.post('/api/auth-player/fight/:roomID',restrictPlayer,  main_page.gameSuit);
// router.get('/api/homepage', (req, res) => res.render('index-cp3', {user: ''})); 




module.exports = router;
