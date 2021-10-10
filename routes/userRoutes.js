const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/registration', userController.registration)
router.get('/users', userController.allUsers)
router.post('/refreshTokens', userController.refreshTokens)

module.exports = router;
