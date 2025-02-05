import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';

const HomePage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/videos');
                const data = await response.json();

                console.log(data);
                setVideos(data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <h2>Videos:</h2>
            <div className="video-list">
                {videos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
