const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express(); // ✅ This must come first
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// ✅ Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', authRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
