import { useEffect, useState , useContext} from 'react'
import VideoCard from '@/components/VideoCard'
import { Skeleton } from '@/components/ui/skeleton'
import { getEvn } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { SidebarContext } from '../Layout/Layout'; 

const Index = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/videos`, {
        credentials: 'include'
      })
      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }
      console.log(data);
      
      setVideos(data.videos)
    } catch (error) {
      showToast('error', error.message)
    } finally {
      setLoading(false)
    }
  }
  const gridClass = isSidebarOpen 
    ? 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6' 
    : 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6';

  return (
    <div className="flex-1 overflow-y-auto bg-white p-4">
      <div className={gridClass}>
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
        ) : (
          videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        )}
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
