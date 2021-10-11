const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../consts');

module.exports.jwtValidate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        console.log('err with middleware', e);
        res.status(401).send();
    }
}