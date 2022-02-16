const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/User');

const auth = asyncHandler(async (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = await jwt.verify(token, JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (err) {
            res.status(401);
            throw new Error('Not Authorized');
        }
    }
    else {
        res.status(401);
        throw new Error('Not Authorized, No token Found');
    }
})

module.exports = { auth };