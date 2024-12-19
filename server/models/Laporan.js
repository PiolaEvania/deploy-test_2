const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const laporanSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name harus diisi']
  },
  email: {
    type: String,
    required: [true, 'email harus diisi'],
  },
  position: {
    latitude: {
      type: Number,
      default: null
    },
    longitude: {
      type: Number,
      default: null
    }
  },
  status: {
    type: String,
    enum: ['Proses', 'Selesai', 'Ditolak'],
    default: 'Proses'
  },
  deskripsi: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  }
}, { timestamps: true });

laporanSchema.index({ 'position.latitude': 1, 'position.longitude': 1 }, { unique: true });

const Laporan = mongoose.model('Laporan', laporanSchema);
module.exports = Laporan;