// UploadForm.jsx
import React, { useState } from 'react';

const UploadForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const thumbnailSample = "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg";
        const thumbnailUsed = thumbnail || thumbnailSample;
        const url = "https://www.youtube.com/watch?v=r_jh0o0vfp8";

        const videoData = {
            title: title,
            description: description,
            url: url,
            thumbnail: thumbnailUsed,
        };

        onSubmit(videoData);

        setTitle('');
        setDescription('');
        setThumbnail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <input 
                    type="text" 
                    id="description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="thumbnail">Thumbnail URL</label>
                <input 
                    type="text" 
                    id="thumbnail" 
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default UploadForm;
