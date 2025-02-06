import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';

const UploadPage = () => {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFormSubmit = async (videoData) => {
        setUploading(true);
        setMessage('');

        try {
            const response = await fetch('https://eon-media-streaming-service.onrender.com/api/v1/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(videoData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Video uploaded successfully: ${data.title}`);
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }

        setUploading(false);
    };

    return (
        <div>
            {uploading && <p>Uploading...</p>}
            {message && <p>{message}</p>}
            <UploadForm onSubmit={handleFormSubmit} />
        </div>
    );
};

export default UploadPage;
