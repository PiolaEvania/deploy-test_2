const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const expressMongoSanitize = require('express-mongo-sanitize');
const cloudinary = require('cloudinary').v2;

dotenv.config();

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// Routes
const authRoutes = require('./routes/authRoute.js');
const roleRoute = require('./routes/roleRoute.js');
const laporanRoute = require('./routes/laporanRoute.js');
const { errorHandler, notFound } = require('./middleware/errorMiddleware.js');

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'https://app-route-sure.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(helmet());
app.use(expressMongoSanitize());
app.use(express.static('./public/uploads'));

// Root route
app.get('/', (req, res) => {
  if (req.query.vercelToolbarCode) {
    return res.send('Vercel Toolbar active');
  }
  res.send('Server is running...');
});

// API routes
app.use('/api', authRoutes);
app.use('/api', roleRoute);
app.use('/api', laporanRoute);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, {})
  .then(() => console.log('Database connected'))
  // eslint-disable-next-line arrow-parens
  .catch(err => console.error('Database connection error:', err));

module.exports = app;
