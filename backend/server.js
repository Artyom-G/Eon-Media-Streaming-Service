// Setup
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Video = require('./models/video');

const app = express();
const PORT = 5000;

const uri = process.env.MONGODB_URI;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('MongoDB connection error:', err);
    });

app.get('/api/v1/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/v1/videos', async (req, res) => {
    try {
        const { title, description, url, thumbnail } = req.body;

        if (!title || !url || !thumbnail) {
            return res.status(400).json({ message: "Title URL and Thumbnail are required" });
        }

        const newVideo = new Video({ title, description, url, thumbnail });
        await newVideo.save();

        res.status(201).json(newVideo);
    } catch (err) {
        res.status(500).json({ message: 'Error creating video', error: err.message });
    }
});

app.get('/api/v1/videos/:id', async (req, res) => {
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
