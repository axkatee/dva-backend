const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/registration', userController.registration)
router.post('/refreshTokens', userController.refreshTokens)

module.exports = router;
