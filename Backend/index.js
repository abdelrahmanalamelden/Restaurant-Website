const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('node:path');
const dotenv = require('dotenv');
const app = express();
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const bookR = require('./routes/bookRoutes');

dotenv.config();
app.use(
  cors({
    origin: 'http://localhost:4200', // Change this to your Angular app's URL
    credentials: true, // Enable set cookie
  })
);
app.listen(8000, () => {
  console.log('Server Started');
});

mongoose.connect(process.env.DB).then(() => {
  console.log('DB Connected');
});

app.use(express.static(path.join(__dirname, '')));
app.use(express.json());
app.use(cookieParser());

app.use('/users', usersRoutes);
app.use('/book', bookR);

app.use('/products', productsRoutes);
