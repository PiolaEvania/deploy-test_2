const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const expressMongoSanitize = require('express-mongo-sanitize');
const cloudinary = require('cloudinary').v2;
const app = express();
const port = 5000;

dotenv.config();

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


//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());
app.use(expressMongoSanitize());
app.use(express.static('./public/uploads'));


//Routes
app.use('/api', authRoutes);
app.use('/api', roleRoute);
app.use('/api', laporanRoute);

app.use(notFound);
app.use(errorHandler);

mongoose.connect(process.env.DATABASE, {
}).then(() => {
  console.log('Database connect');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${ port }`);
});