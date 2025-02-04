// Setup
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 5000;

const uri = process.env.MONGODB_URI;

// Create a simple "ping" route
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
