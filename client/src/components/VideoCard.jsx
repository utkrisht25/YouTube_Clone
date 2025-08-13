import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from './ui/avatar';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import userImg from '@/assets/images/favicon_white.png';
import { SidebarContext } from '../../src/Layout/Layout'; // Adjusted path based on history (update if needed)

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const formatViewCount = (views) => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views;
};

const formatDuration = (duration) => {
  // Parse string duration like "12:18" to total seconds
  if (typeof duration !== 'string') return '0:00';
  const [minutesStr, secondsStr] = duration.split(':');
  const minutes = parseInt(minutesStr, 10) || 0;
  const seconds = parseInt(secondsStr, 10) || 0;
  const totalSeconds = minutes * 60 + seconds;
  return `${Math.floor(totalSeconds / 60)}:${(totalSeconds % 60).toString().padStart(2, '0')}`;
};

// Helper to safely parse uploadTime string to Date (fallback if invalid)
const getUploadDate = (uploadTime) => {
  const date = new Date(uploadTime);
  return isNaN(date.getTime()) ? null : date;
};

const VideoCard = ({ video }) => {
  const { isSidebarOpen } = useContext(SidebarContext);
  console.log('Video data:', video); // Debug log to see what data we're receiving
  
  // Conditional classes based on sidebar state
  const avatarSize = isSidebarOpen ? 'w-9 h-9' : 'w-12 h-12';
  const titleClass = isSidebarOpen ? 'text-base font-semibold' : 'text-lg font-bold';
  const textSize = isSidebarOpen ? 'text-sm' : 'text-base';
  const durationClass = isSidebarOpen ? 'text-xs px-1 py-0.5' : 'text-sm px-2 py-1';
  const mtClass = isSidebarOpen ? 'mt-2' : 'mt-4';

  return (
    <div className="w-full cursor-pointer">
      <Link to={`/watch/${video._id}`}>
        <div className="relative">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="w-full rounded-xl aspect-video object-cover"
          />
          <span className={`absolute bottom-1 right-1 bg-black bg-opacity-80 text-white ${durationClass} rounded`}>
            {formatDuration(video.duration)}
          </span>
        </div>
        <div className={`flex gap-x-3 ${mtClass}`}>
          <Link to={`/channel/${video.channel?._id}`}>
            <Avatar>
              <img 
                src={ userImg} 
                alt={video.channel?.name || 'Channel avatar'}
                className={`rounded-full ${avatarSize} object-cover`}
              />
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <h3 className={`${titleClass} line-clamp-2`}>
              {video.title}
            </h3>
            {video.channel?.name && (
              <Link 
                to={`/channel/${video.channel._id}`}
                className={`${textSize} text-gray-600 hover:text-gray-900 mt-1`}
              >
                {video.channel.name}
              </Link>
            )}
            <div className={`${textSize} text-gray-600`}>
              {formatViewCount(video.views)} views 
              {video.uploadTime && getUploadDate(video.uploadTime) && (
                <> • {timeAgo.format(getUploadDate(video.uploadTime))}</>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
