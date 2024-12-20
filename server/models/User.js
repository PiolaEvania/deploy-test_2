const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Roles = require('../models/Role');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nama harus diisi'],
  },
  email: {
    type: String,
    required: [true, 'Email harus diisi'],
    validate: {
      validator: validator.isEmail,
      message: 'Alamat email harus berformat example@gmail.com'
    },
    unique: [true, 'Email sudah terdaftar']
  },
  password: {
    type: String,
    required: [true, 'Password harus diisi'],
    minLength: [6, 'Password minimal 6 karakter']

  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Roles',
  }
});

userSchema.pre('save', async function () {
  if (this.name !== 'Routesure') {
    const roleId = await Roles.findOne({ name: 'user' });
    this.role = roleId._id;
  }
  else if (this.name === 'Routesure') {
    const roleId = await Roles.findOne({ name: 'admin' });
    this.role = roleId._id;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.comparePassword = async function (reqBody) {
  return await bcrypt.compare(reqBody, this.password);
};

const User = mongoose.model('Users', userSchema);
module.exports = User;