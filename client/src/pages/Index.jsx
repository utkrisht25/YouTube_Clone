import { useEffect, useState } from 'react'
import VideoCard from '@/components/VideoCard'
import { Skeleton } from '@/components/ui/skeleton'
import { getEvn } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'

const Index = () => {
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
      setVideos(data.videos)
    } catch (error) {
      showToast('error', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-2xl mx-auto">
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