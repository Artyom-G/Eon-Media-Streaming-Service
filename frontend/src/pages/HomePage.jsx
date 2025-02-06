import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import SearchBar from '../components/SearchBar';
import './HomePage.scss';

const HomePage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/videos');
                const data = await response.json();
                setVideos(data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    const handleSearchResults = (results) => {
        console.log(results);
        setVideos(results);
    };

    return (
        <div>
            <h1>Home Page</h1>
            <SearchBar onResults={handleSearchResults} />
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
