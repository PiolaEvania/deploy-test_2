const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const roleSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nama Wajib diisi!']
  }
});

const Roles = mongoose.model('Roles', roleSchema);
module.exports = Roles;