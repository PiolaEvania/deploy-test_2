const Roles = require('../models/Role');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');


exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(res.status(401).json({
      status: 'Error',
      message: 'Anda belum login.'
    }));
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const currentUser = await Users.findById(decode._id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'Error',
        message: 'Pengguna tidak ditemukan.'
      });
    }
    req.user = currentUser;
    next();
  } catch (err) {
    return next(res.status(401).json({
      error: err,
      message: 'Token yang dimasukkan tidak valid.'
    }));
  }
};

exports.permissionRole = (...roles) => {
  return async (req, res, next) => {
    try {
      const rolesData = await Roles.findById(req.user.role);
      const roleName = rolesData.name;
      if (!roles.includes(roleName)) {
        return res.status(403).json({
          status: 403,
          error: 'Anda tidak dapat mengakses halaman ini.'
        });
      }
      next();
    } catch (err) {
      return res.status(500).json({
        status: 'Error',
        message: 'Terjadi kesalahan pada server.'
      });
    }
  };
};
