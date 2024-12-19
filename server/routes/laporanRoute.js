const express = require('express');
const laporanRoute = express.Router();
const upload = require('../utils/fileUpload');
const { authMiddleware, permissionRole } = require('../middleware/userMiddleware');
const { createLaporan, getLaporan, updateStatusLaporan, deleteLaporan, detailLaporan } = require('../controllers/laporancontrollers');


laporanRoute.get('/laporan', authMiddleware, permissionRole('admin', 'user'), getLaporan);
laporanRoute.get('/laporan/:id', authMiddleware, permissionRole('admin'), detailLaporan);
laporanRoute.post('/laporan', authMiddleware, permissionRole('admin', 'user'), upload.single('image'), createLaporan);
laporanRoute.put('/laporan/:id', authMiddleware, permissionRole('admin'), updateStatusLaporan);
laporanRoute.delete('/laporan/:id', authMiddleware, permissionRole('admin'), deleteLaporan);

module.exports = laporanRoute;
