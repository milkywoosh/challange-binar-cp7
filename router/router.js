const router = require('express').Router();
const auth = require('../controllers/authController');
// const main_page = require('../controllers/main-apps-game/main-apps-controller');


//register page
router.get('/api/register', (req, res) => res.render('register'));
router.post('/api/register', auth.register);


//login page
// router.get('/api/login', (req, res, next) => res.render('login'));
router.get('/api/login', (req, res, next) => res.send({message: 'success login'}));
router.post('/api/login' , auth.login);




module.exports = router;