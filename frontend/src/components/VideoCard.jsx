import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.scss';

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video.id || video._id}`} className="video-card-link">
      <div className="video-card">
        <div className="video-thumbnail-wrapper">
          <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
        </div>
        <div className="video-info">
          <h3 className="video-title">{video.title}</h3>
          <p className="video-desc">{video.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;