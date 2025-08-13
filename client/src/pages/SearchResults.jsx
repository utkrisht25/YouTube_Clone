import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '@/components/VideoCard';
import { getEvn } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/videos/search?query=${encodeURIComponent(query)}`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setVideos(data.videos);
    } catch (error) {
      showToast('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      {query ? (
        <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      ) : (
        <h1 className="text-2xl font-bold mb-6">All Videos</h1>
      )}
      {videos.length === 0 ? (
        <p className="text-gray-600">
          {query ? `No videos found for "${query}"` : 'No videos available'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
