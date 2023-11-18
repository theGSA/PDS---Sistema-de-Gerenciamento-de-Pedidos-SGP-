const router = require('express').Router();
const LoginController = require('../Controllers/LoginController');
const HomeController = require('../Controllers/HomeController')
const AuthController = require('../Controllers/AuthController')

router.get('/Login', LoginController.index );
router.get('/Home', HomeController.index);
router.get('/Auth', AuthController.index);




module.exports = router;