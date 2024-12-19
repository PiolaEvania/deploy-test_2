const Laporan = require('../models/Laporan');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

exports.getLaporan = async (req, res) => {
  try {
    const getDataLaporan = await Laporan.find();
    return res.status(200).json({
      status: 'success',
      data: getDataLaporan
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      error: error.stack
    });
  }
};

exports.createLaporan = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'File image tidak di temukan.' });
    }

    const uploadImage = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
          folder: 'uploads',
          allowed_formats: ['jpeg', 'jpg', 'png']
        }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.secure_url);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const imageUrl = await uploadImage();
    const { latitude, longitude } = req.body;
    const radius = 0.0018; // Radius dalam derajat (sekitar 200 meter)

    const nearbyLaporan = await Laporan.find();
    const isNearby = nearbyLaporan.some(laporan => {
      const deltaLat = latitude - laporan.position.latitude;
      const deltaLon = longitude - laporan.position.longitude;
      const distance = Math.sqrt(deltaLat * deltaLat + deltaLon * deltaLon);
      return distance <= radius;
    });

    if (isNearby) {
      return res.status(400).json({
        message: 'Laporan sudah ada dalam radius yang ditentukan.'
      });
    }

    const laporan = await Laporan.create({
      name: req.body.name,
      email: req.body.email,
      position: { latitude, longitude },
      deskripsi: req.body.deskripsi,
      image: imageUrl
    });

    return res.status(200).json({
      status: 'success',
      message: 'Terima Kasih atas laporan Anda. Laporan Anda sedang dalam proses.',
      data: laporan
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      error: error.stack
    });
  }
};

exports.updateStatusLaporan = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: 'ID tidak ditemukan.'
    });
  }
  try {
    const getIdLaporan = await Laporan.findById(id);
    if (!getIdLaporan) {
      return res.status(404).json({

        message: 'Laporan tidak ditemukan.'
      });
    }
    const updateStatusLaporan = await Laporan.findByIdAndUpdate(
      id,
      {
        status: req.body.status,
      },
      { new: true }
    );
    return res.status(200).json({
      message: 'Status laporan berhasil diupdate.',
      data: updateStatusLaporan
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error!',
      message: error.message
    });
  }
};

exports.deleteLaporan = async (req, res) => {
  const id = req.params.id;
  try {
    // Periksa apakah id ada dalam parameter
    if (!id) {
      return res.status(400).json({
        message: 'ID laporan tidak ditemukan.'
      });
    }

    // Cari laporan berdasarkan ID
    const laporan = await Laporan.findById(id);
    if (!laporan) {
      return res.status(404).json({ message: 'Laporan tidak ditemukan.' });
    }

    // Ambil URL gambar jika ada
    const imageUrl = laporan.image;
    if (imageUrl) {
      // Ekstrak public_id dari URL gambar
      const imagePublicId = imageUrl.split('/').pop().split('.')[0];
      if (imagePublicId) {
        // Hapus gambar dari Cloudinary
        await cloudinary.uploader.destroy(`uploads/${imagePublicId}`, (error, result) => {
          if (error) {
            console.error('Gagal menghapus aset di Cloudinary:', error.message);
          } else {
            console.log('Gambar berhasil dihapus dari Cloudinary:', result);
          }
        });
      }
    }

    // Hapus laporan dari database
    await Laporan.findByIdAndDelete(id);

    // Kirim response sukses
    return res.status(200).json({
      message: 'Laporan berhasil dihapus.'
    });
  } catch (error) {
    console.error('Kesalahan saat menghapus laporan:', error.message);
    return res.status(500).json({
      status: 'Internal Server Error!',
      message: error.message
    });
  }
};

exports.detailLaporan = async (req, res) => {
  const id = req.params.id;
  try {
    const detailLaporan = await Laporan.findById(id);
    return res.status(200).json({
      detailLaporan
    });
  } catch (error) {
    return res.status(500).json({
      message: error.stack
    });
  }

};
