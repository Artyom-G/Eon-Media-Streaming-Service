import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import './VideoPage.scss';

const VideoPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`https://eon-media-streaming-service.onrender.com/api/v1/videos/${videoId}`);
        const data = await response.json();
        setVideo(data);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-page">
      <VideoPlayer
        videoSrc={video.url}
        posterImage={video.thumbnail}
      />
      <h1>{video.title}</h1>
      <p>{video.description}</p>
    </div>
  );
};

export default VideoPage;
