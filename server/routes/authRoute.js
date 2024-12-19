const express = require('express');
const authUser = express.Router();
const { register, login, logout, getCurrentUser, getUser, forgotPassword, resetPassword } = require('../controllers/authControllers.js');
const { authMiddleware } = require('../middleware/userMiddleware.js');

authUser.post('/register', register);
authUser.post('/login', login);
authUser.post('/forgotPassword', forgotPassword);
authUser.put('/resetPassword/:token', resetPassword);
authUser.post('/logout', authMiddleware, logout);
authUser.get('/get-user/:id', authMiddleware, getCurrentUser);
authUser.get('/get-user', getUser);

module.exports = authUser;