 import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VideoFeed from './components/VideoFeed';
import UploadPage from './pages/Upload';
import { PlusCircle, Home } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="h-screen bg-black">
        {/* Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-gray-800 z-50">
          <div className="flex justify-around py-3">
            <Link to="/" className="flex flex-col items-center text-gray-400 hover:text-white">
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link to="/upload" className="flex flex-col items-center text-gray-400 hover:text-purple-500">
              <PlusCircle className="w-6 h-6" />
              <span className="text-xs mt-1">Create</span>
            </Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<VideoFeed />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
