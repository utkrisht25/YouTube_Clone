import { useEffect, useState, useContext } from 'react'
import VideoCard from '@/components/VideoCard'
import { Skeleton } from '@/components/ui/skeleton'
import { getEvn } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { SidebarContext } from '../Layout/Layout';
import { Button } from '@/components/ui/button'; 

const Index = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([{ id: 'all', label: 'All' }]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch categories only once when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch videos when selected category changes
  useEffect(() => {
    fetchVideos();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/videos/categories`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (!response.ok) {
        return showToast('error', data.message);
      }
      // Keep original category values as ids to match with backend
      const formattedCategories = [
        { id: 'all', label: 'All' },
        ...data.categories.map(category => ({
          id: category,
          label: category.charAt(0).toUpperCase() + category.slice(1)
        }))
      ];
      setCategories(formattedCategories);
    } catch (error) {
      showToast('error', error.message);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const url = selectedCategory === 'all' 
        ? `${getEvn('VITE_API_BASE_URL')}/videos`
        : `${getEvn('VITE_API_BASE_URL')}/videos?category=${selectedCategory}`;
        
      const response = await fetch(url, {
        credentials: 'include'
      });
      const data = await response.json();
      if (!response.ok) {
        return showToast('error', data.message);
      }
      setVideos(data.videos);
    } catch (error) {
      showToast('error', error.message);
    } finally {
      setLoading(false);
    }
  }
  const gridClass = isSidebarOpen 
    ? 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6' 
    : 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6';

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {/* Category Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto p-4 sticky top-0 bg-white border-b z-10">
        {loadingCategories ? (
          // Loading skeletons for category buttons
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))
        ) : (
          categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="whitespace-nowrap rounded-full px-4"
            >
              {category.label}
            </Button>
          ))
        )}
      </div>

      <div className={`${gridClass} p-4`}>
        {loading ? (
          // Loading skeletons
          [...Array(12)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <div className="flex gap-x-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            </div>
          ))
        ) : videos.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-xl text-gray-500">No videos found in this category</p>
          </div>
        ) : (
          videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        )}
      </div>
    </div>
  )
}

export default Index;
