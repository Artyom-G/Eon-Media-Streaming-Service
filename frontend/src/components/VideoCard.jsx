import React from 'react';
import './VideoCard.scss';

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <div className="video-thumbnail-wrapper">
        <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-desc">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
