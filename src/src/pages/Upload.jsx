import { useState } from 'react';
import { Upload, X, Video, File, Tag, XCircle } from 'lucide-react';

function UploadPage() {
  const [videoFile, setVideoFile] = useState(null);
  const [assets, setAssets] = useState([]);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [preview, setPreview] = useState(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      const videoURL = URL.createObjectURL(file);
      setPreview(videoURL);
    }
  };

  const handleAssetUpload = (e) => {
    const files = Array.from(e.target.files);
    setAssets([...assets, ...files]);
  };

  const removeAsset = (index) => {
    setAssets(assets.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This will connect to backend later
    console.log({
      video: videoFile,
      assets,
      description,
      tags
    });
    alert('Video uploaded! (Backend coming soon)');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      <div className="max-w-2xl mx-auto p-6 pt-20">
        <h1 className="text-3xl font-bold mb-2">Upload to Tweakers</h1>
        <p className="text-gray-400 mb-8">Share your creation with the world ✨</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Upload */}
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 transition">
            {!preview ? (
              <label className="cursor-pointer block">
                <Video className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-lg font-medium">Click to upload video</p>
                <p className="text-sm text-gray-400">MP4, MOV, or WebM (max 100MB)</p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <video 
                  src={preview} 
                  className="max-h-96 mx-auto rounded-lg"
                  controls
                />
                <button
                  type="button"
                  onClick={() => {
                    setVideoFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Asset Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Downloadable Assets</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
              <label className="cursor-pointer flex items-center gap-2 text-purple-400 hover:text-purple-300">
                <File className="w-4 h-4" />
                <span>Add files (templates, code, images, etc)</span>
                <input
                  type="file"
                  multiple
                  onChange={handleAssetUpload}
                  className="hidden"
                />
              </label>
              
              {assets.length > 0 && (
                <div className="mt-3 space-y-2">
                  {assets.map((asset, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-800 rounded-lg p-2">
                      <span className="text-sm truncate flex-1">{asset.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAsset(idx)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
              rows="3"
              placeholder="What's your video about? Inspire others!"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {tags.map(tag => (
                <span key={tag} className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                  #{tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                placeholder="Add tag (e.g., music, art, coding)"
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-gray-800 px-4 rounded-lg hover:bg-gray-700"
              >
                <Tag className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!videoFile}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Publish to Tweakers
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
