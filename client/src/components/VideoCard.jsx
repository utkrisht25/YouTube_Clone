import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from './ui/avatar'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const formatViewCount = (views) => {
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`
    }
    return views
}

const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const VideoCard = ({ video }) => {
    console.log('Video data:', video); // Debug log to see what data we're receiving
    return (
        <div className="w-full cursor-pointer">
            <Link to={`/watch/${video._id}`}>
                <div className="relative">
                    <img 
                        src={video.thumbnailUrl} 
                        alt={video.title}
                        className="w-full rounded-xl aspect-video object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                        {formatDuration(video.duration)}
                    </span>
                </div>
                <div className="flex gap-x-3 mt-3">
                    <Link to=''>
                        <Avatar>
                            <img 
                                src={video.channel?.avatar} 
                                alt={video.channel?.name || 'Channel avatar'}
                                className="rounded-full w-9 h-9 object-cover"
                            />
                        </Avatar>
                    </Link>
                    <div className="flex flex-col">
                        <h3 className="text-base font-medium line-clamp-2">
                            {video.title}
                        </h3>
                        {video.channel?.name && (
                            <Link 
                                to={`/channel/${video.channel._id}`}
                                className="text-sm text-gray-600 hover:text-gray-900 mt-1"
                            >
                                {video.channel.name}
                            </Link>
                        )}
                        <div className="text-sm text-gray-600">
                            {formatViewCount(video.views)} views 
                            {video.createdAt && (
                                <> • {timeAgo.format(new Date(video.createdAt))}</>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default VideoCard
