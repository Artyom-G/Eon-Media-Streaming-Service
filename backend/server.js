// Setup
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Video = require('./models/video');

const app = express();
const PORT = 5000;

const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('MongoDB connection error:', err);
  });

app.get('/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/videos/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
        return res.status(404).json({ message: 'Video not found' });
        }
        res.json(video);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
