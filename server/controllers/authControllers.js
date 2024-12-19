const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


const createSendToken = async (user, statusCode, res) => {
  const token = jwt.sign({ _id: user._id, role: user.role, name: user.name }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const cookieOption = {
    expire: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };
  res.cookie('jwt', token, cookieOption);
  user.password = undefined;
  res.status(statusCode).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};


exports.register = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Password dan confirm Password tidak sama.'
      });
    }
    const registerData = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(200).json({
      message: 'Success',
      registerData
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      message: error.stack
    });
  }
};

exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Validasi Error.',
    });
  }
  const userData = await Users.findOne({
    email: req.body.email,
  });
  if (
    !userData || !(await userData.comparePassword(req.body.password))
  ) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Error login.',
      error: 'Invalid email or password!',
    });
  }
  createSendToken(userData, 201, res);
};

exports.getUser = async (req, res) => {
  try {
    const user = await Users.find().select('-password');
    return res.status(200).json({
      user
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server.'
    });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId).select('-password');
    return res.status(200).json({
      user
    });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Pengguna tidak ditemukan.'
    });
  }
};

exports.logout = async (req, res) => {
  res.cookie('jwt', '', {
    expires: 0,
    httpOnly: true
  });
  return res.status(200).json({
    message: 'Logout berhasil.'
  });
};

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await Users.findOne({
      email: email
    });
    if (!user) {
      return res.status(400).json({
        message: 'Email Anda tidak di temukan.'
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'routesure1@gmail.com', pass: 'ocxu iddg qvga bgum' } });

    const mailOptions = {
      from: 'routesure1@gmail.com',
      to: user.email,
      subject: 'Reset Password RouteSure',
      html: `
            <h2>Halo ${ user.name },</h2>
            <p>Kami menerima permintaan untuk mereset password akun Anda. Jika Anda tidak membuat permintaan ini, abaikan email ini.
            </p><br>
            <p>Untuk reset password, silakan klik tautan di bawah ini:</p>
            <a href="http://localhost:3000/resetPassword/${ token }">Reset Password</a>
            <p>Jika Anda mengalami masalah atau memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.
            Terima kasih.
            <p>Salam Hangat,</p><br> <p>RouteSure Team</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          message: error.toString()
        });
      }
      res.status(200).json({
        message: 'Verifikasi Email telah dikirim!'
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error.',
      error: err.stack
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  if (!token) {
    return res.status(404).json({
      message: 'Token tidak valid.'
    });
  } try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Users.findById(decoded._id);
    if (!user) {
      return res.status(400).json({
        message: 'Pengguna tidak ditemukan.'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.findByIdAndUpdate(decoded._id, { password: hashedPassword });
    return res.status(200).json({ message: 'Password berhasil diubah, silakan login kembali.' });
  } catch (error) {
    return res.status(400).json({
      message: 'Token tidak valid atau telah kedaluwarsa.'
    });
  }
};