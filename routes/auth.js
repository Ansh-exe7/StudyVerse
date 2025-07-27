const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const path = require('path');

const router = express.Router();

// Serve Login Page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/Login.html'));
});

// Handle Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.send('Invalid credentials');
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.send('Invalid credentials');

    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect('/dashboard');
  });
});

// Serve Registration Page
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/registration.html')); // adjust path
});

// Handle Registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // check if username exists
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.send('Database error');
    if (results.length > 0) return res.send('Username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err, results) => { 
        if (err) return res.send('Error inserting user');

        res.redirect('/login');
      }
    );
  });
});

// Dashboard
router.get('/dashboard', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

router.get('/api/user', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  res.json({ username: req.session.username });
});


module.exports = router;
