import { useState } from 'react';
import { envConfig } from '../utils/envConfig';
import { youtubeApi } from '../services/youtubeApi';

export default function SearchPanel({ panelId }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchEngine, setSearchEngine] = useState('google');
  const [youtubeVideoIds, setYoutubeVideoIds] = useState([]);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [apiError, setApiError] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setApiError(null);
    
    try {
      const searchUrls = {
        google: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
        youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`
      };

      let mockResults = [];
      let videoResults = [];

      if (searchEngine === 'youtube') {
        mockResults = []; // YouTube検索時は結果リストを空にする

        try {
          // 実際のYouTube API呼び出し
          videoResults = await youtubeApi.searchVideos(searchQuery, 5);
          setYoutubeVideos(videoResults);
          setYoutubeVideoIds(videoResults.map(video => video.id));
        } catch (apiError) {
          console.error('YouTube API Error:', apiError);
          setApiError(apiError.message);
          
          // APIエラー時のフォールバック（デモ動画）
          const fallbackVideoIds = ['dQw4w9WgXcQ', 'jNQXAC9IVRw', 'L_jWHffIx5E'];
          setYoutubeVideoIds(fallbackVideoIds);
          setYoutubeVideos([]);
        }
      } else {
        mockResults = [
          {
            id: 1,
            title: `${searchQuery} - Google検索`,
            url: searchUrls.google,
            snippet: `Googleで「${searchQuery}」を検索します。`,
          },
        ];
      }

      setTimeout(() => {
        setSearchResults(mockResults);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('検索エラー:', error);
      setIsLoading(false);
      setApiError(error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow w-full h-96 flex flex-col bg-white">
      <div className="border-b pb-2 mb-2">
        <h3 className="text-sm font-bold mb-2">検索パネル {panelId}</h3>
        
        <div className="mb-2">
          <select
            value={searchEngine}
            onChange={(e) => setSearchEngine(e.target.value)}
            className="border rounded p-1 text-xs w-full mb-2"
          >
            <option value="google">Google</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>
        
        <div className="flex gap-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="検索キーワードを入力"
            className="flex-1 border rounded p-1 text-xs"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-blue-500 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
          >
            {isLoading ? '検索中...' : '検索'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <div className="text-center py-4">
            <div className="text-sm text-gray-500">検索中...</div>
          </div>
        )}
        
        {!isLoading && searchResults.length === 0 && searchQuery && searchEngine !== 'youtube' && (
          <div className="text-center py-4 text-sm text-gray-500">
            検索結果がありません
          </div>
        )}
        
        
        {!isLoading && searchResults.map((result) => (
          <div key={result.id} className="mb-3 p-2 border-b">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              {result.title}
            </a>
            <div className="text-xs text-green-600 mt-1">{result.url}</div>
            <div className="text-xs text-gray-600 mt-1">{result.snippet}</div>
          </div>
        ))}
        
        {apiError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <div className="text-sm font-medium text-red-800">⚠️ APIエラー</div>
            <div className="text-xs text-red-700 mt-1">{apiError}</div>
            <div className="text-xs text-red-600 mt-1">フォールバック動画を表示しています</div>
          </div>
        )}
        
        {!isLoading && searchEngine === 'youtube' && youtubeVideoIds.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-bold text-red-800 mb-2">🎬 YouTube動画</h4>
            {youtubeVideoIds.map((videoId, index) => {
              const video = youtubeVideos.find(v => v.id === videoId);
              return (
                <div key={videoId} className="bg-gray-50 p-2 rounded">
                  <div className="text-xs text-gray-600 mb-2">
                    {video ? (
                      <div>
                        <div className="font-medium">{video.title}</div>
                        <div className="text-gray-500">{video.channelTitle}</div>
                      </div>
                    ) : (
                      `動画 ${index + 1}: ${videoId}`
                    )}
                  </div>
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={video ? video.title : `YouTube video ${index + 1}`}
                      style={{ border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded"
                    ></iframe>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}