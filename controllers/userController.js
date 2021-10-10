const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const tokenExpiration = 3600;
const refreshTokenExpiration = 86400;
const TOKEN_SECRET =
    '924ce4af5efec064e4ddb904ee4d71f0b20adf735e5d71f86289bfd3d7cc8dcaadeaee6ab1cfde9e1fa1b35957f74c4c796fefb31ef279c4dc474966f052d185';
const REF_TOKEN_SECRET =
    '39632ab0a2112e9dbf6b4bbd9455197e9048ea0f3c15b0bbeed2e2967863fffb4062e8d21aa1303355ed5f969d4eadd41255616de078c235ec3c10f3ac7dfbe4';

function getTokens(user) {
    if (!user) {
        console.log('no token');
        return undefined;
    }
    const data = {
        email: user.email,
        _id: user._id,
    }
    const token = jwt.sign(data, TOKEN_SECRET, { expiresIn: `${tokenExpiration}s` });
    const refToken = jwt.sign(data, REF_TOKEN_SECRET, { expiresIn: `${refreshTokenExpiration}s` });
    return { token, refToken };
}

module.exports.refreshTokens = async (req, res) => {
    try {
        const oldToken = req.body.refToken;
        const decoded = jwt.verify(oldToken, REF_TOKEN_SECRET);
        const id = decoded._id;
        const user = await User.findOne({ _id: id });
        if (!user) {
            res.status(403).send();
        }
        const { token, refToken } = getTokens(user);
        return res.send({ token, refToken });
    } catch (e) {
        console.log('error with refresh token ', e);
        return res.status(403).send({ message: 'error with refresh token' });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).send({ message: 'No email or password' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'invalid password' });
        }
        const { token, refToken } = getTokens(user);
        const userData = {
            token,
            refToken,
            user: {
                id: user.id,
                email: user.email
            }
        }
        res.send(userData);
    } catch (e) {
        console.log('error with login ', e)
        return res.status(500).send(e);
    }
}

module.exports.registration = async (req, res) => {
        try {
            const { email, password } = req.body;
            const ifUserExist = await User.findOne({ email });

            if (ifUserExist) {
                return res.status(400).send({ message: 'user is already exist' });
            }
            const hashPassword = await bcrypt.hash(password, 8);
            const user = await User.create({
                email,
                password: hashPassword,
            })
            const { token, refToken } = getTokens(user);
            const userData = {
                token,
                refToken,
                user: {
                    id: user.id,
                    email: user.email
                }
            }
            return res.status(200).json({ message: 'user was created', userData });
        } catch (e) {
            console.log('err with registration ', e)
            return res.status(401).send(e)
        }
    }

module.exports.allUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        return res.send(allUsers);
    } catch (e) {
        console.log('error with getting all users ', e)
        return res.status(500).send(e);
    }
}
