const express = require('express');
const roleRoute = express.Router();
const { addRole } = require('../controllers/rolesControllers.js');

roleRoute.post('/role', addRole);

module.exports = roleRoute;