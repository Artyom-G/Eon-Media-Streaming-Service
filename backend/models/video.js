const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  thumbnail: { type: String, required: true },
  duration: { type: Number },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now } 
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
