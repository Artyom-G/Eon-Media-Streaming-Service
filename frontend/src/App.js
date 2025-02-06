import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import VideoPage from './pages/VideoPage';
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className='content'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/video/:videoId" element={<VideoPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
