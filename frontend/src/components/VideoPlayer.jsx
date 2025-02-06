import React, { useRef, useState } from 'react';
import './VideoPlayer.scss';

const VideoPlayer = ({ videoSrc, posterImage }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="video-player">
            <video
                ref={videoRef}
                src={videoSrc}
                poster={posterImage}
                onClick={togglePlayPause}
            >
                Your browser does not support the video tag.
            </video>

            <div className="controls">
                <button onClick={togglePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
};

export default VideoPlayer;
