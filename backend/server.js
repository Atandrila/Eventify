const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const allowedOrigins = [
  'https://eventify-3tec.vercel.app/', 
  'http://localhost:5173/',
  'http://localhost:3000/'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow tools/curl
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Eventify API running' });
});

// DB connect (only once in cold start)
connectDB();

// ❗️DO NOT app.listen() on Vercel
module.exports = app;
