const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../models/User');

// @Desc    Register New User
// @Route   POST /api/users
// @Access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Small Validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check If user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash Password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Register User
    const newUser = new User({
        name,
        email,
        password: hashedPassword
    })

    await newUser.save();

    res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser._id)
    })
})

// @Desc    Login User
// @Route   POST /api/users/login
// @Access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check If user exists
    const userExists = await User.findOne({ email });

    if (!userExists) {
        res.status(400);
        throw new Error('No such User exists');
    }

    // Match Password
    const isMatchPassword = await bcryptjs.compare(password, userExists.password);

    if (isMatchPassword) {
        // Login User
        res.status(200).json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            token: generateToken(userExists._id)
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid Credentials');
    }
})

// @Desc    Get User Data
// @Route   GET /api/users/me
// @Access  Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = req.user;
    res.status(200).json({
        _id,
        name,
        email
    })
})

const generateToken = (id) => {
    const payload = { id };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
};
