import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import SearchBar from '../components/SearchBar';
import Carousel from '../components/Carousel';
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
        setVideos(results);
    };

    return (
        <div className='home-page'>
            <h1>YouFlix</h1>
            <SearchBar onResults={handleSearchResults} />
            <h2>Videos:</h2>
            <Carousel>
                {videos.map((video) => (
                    <VideoCard key={video.id || video._id} video={video} />
                ))}
            </Carousel>
        </div>
    );
};

export default HomePage;
