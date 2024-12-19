const Roles = require('../models/Role');

exports.addRole = async (req, res) => {
  try {
    const role = await Roles.create({
      name: req.body.name
    });
    return res.status(201).json({
      message: 'Success',
      data: role
    });
  } catch (error) {
    return res.status(500).json({
      message: error.stack
    });
  }
};
