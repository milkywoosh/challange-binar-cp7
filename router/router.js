const router = require('express').Router();

const auth = require('../controllers/authController');

//home page
router.get('/api/homepage', (req, res) => res.render('index')); 
//register page
router.get('/api/register', (req, res) => res.render('register'));
router.post('/api/register', auth.register);

//login page
router.get('/api/login', (req, res, next) => res.render('login'));
router.post('/api/login',auth.login);

module.exports = router;