import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import UploadPage from './pages/UploadPage';
import './App.scss';

const App = () => {
  return (
    <Router>
      <div style={appStyles}>
        <Sidebar />
        <div style={contentStyles}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
