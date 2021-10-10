const jwt = require('jsonwebtoken');
const TOKEN_SECRET =
    '924ce4af5efec064e4ddb904ee4d71f0b20adf735e5d71f86289bfd3d7cc8dcaadeaee6ab1cfde9e1fa1b35957f74c4c796fefb31ef279c4dc474966f052d185';

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