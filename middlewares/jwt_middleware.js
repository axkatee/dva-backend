const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../consts').TOKEN_SECRET;

module.exports.jwtValidate = async (req, res, next) => {
    try {
        console.log("middleware")
        console.log(TOKEN_SECRET);

        const token = req.header('Authorization');
        console.log(token)
        req.user = jwt.verify(token, TOKEN_SECRET);
        next();
    } catch (e) {
        console.log('err with middleware', e);
        res.status(401).send();
    }
}