const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { registerUser, loginUser, getMe } = require('../controllers/userController');

router.route('/').post(registerUser);
router.post('/login', loginUser);
router.route('/me').get(auth, getMe);

module.exports = router;