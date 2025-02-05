import React from 'react';
import './VideoCard.scss'

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
      <h3 className="video-title">{video.title}</h3>
      <p className="video-desc">{video.description}</p>
    </div>
  );
};

export default VideoCard;
