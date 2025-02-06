// Setup
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const createAwsConnector = require('aws-opensearch-connector');
const AWS = require('aws-sdk');

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

const { Client } = require('@opensearch-project/opensearch');
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const awsConnector = createAwsConnector(AWS.config);

const opensearchClient = new Client({
    ...awsConnector,
    node: process.env.OPENSEARCH_URL
});

// Get all videos
app.get('/api/v1/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a video
app.post('/api/v1/videos', async (req, res) => {
    try {
        const { title, description, url, thumbnail } = req.body;

        if (!title || !url || !thumbnail) {
            return res.status(400).json({ message: "Title URL and Thumbnail are required" });
        }

        const newVideo = new Video({ title, description, url, thumbnail });
        await newVideo.save();

        await opensearchClient.index({
            index: 'videos',
            id: newVideo._id.toString(),
            body: {
                title,
                description,
                url,
                thumbnail,
                createdAt: new Date()
            }
        });

        res.status(201).json(newVideo);
    } catch (err) {
        res.status(500).json({ message: 'Error creating video', error: err.message });
    }
});

// Get Video by Id (for testing)
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

// Add Video Endpoint To ElasticSearch (for Testing)
app.post('/api/v1/add-video', async (req, res) => {
    try {
        const { id, title, description, url, thumbnail, duration, views, createdAt } = req.body;

        const response = await opensearchClient.index({
            index: 'videos',
            id: id,
            body: {
                title,
                description,
                url,
                thumbnail,
                duration,
                views,
                createdAt
            }
        });

        res.json({ message: 'Video added', response });
    } catch (error) {
        res.status(500).json({ message: 'Error adding video', error: error.message });
    }
});

// Search Endpoint (to ElasticSearch)
app.get('/api/v1/search', async (req, res) => {
    try {
        const { query } = req.query;
        const result = await opensearchClient.search({
            index: 'videos',
            body: {
                query: {
                    multi_match: {
                        query: query,
                        fields: ['title', 'description']
                    }
                }
            }
        });

        console.log("Full search response:", result);

        if (!result.body || !result.body.hits) {
            return res.status(500).json({ message: "Unexpected search response structure", result });
        }

        const hits = result.body.hits.hits;

        res.json(hits.map(hit => ({
            id: hit._id,
            ...hit._source
        })));
    } catch (err) {
        res.status(500).json({ message: "Error fetching data", error: err.message });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
