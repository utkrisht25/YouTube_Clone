import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import VideoCard from '@/components/VideoCard';
import { FaCheckCircle } from "react-icons/fa";
import { getEvn } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';

const ChannelPage = () => {
    const { channelId } = useParams();
    const [channel, setChannel] = React.useState(null);
    const [videos, setVideos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetchChannelAndVideos();
    }, [channelId]);

    const fetchChannelAndVideos = async () => {
        try {
            const [channelRes, videosRes] = await Promise.all([
                fetch(`${getEvn('VITE_API_BASE_URL')}/channels/${channelId}`, {
                    credentials: 'include'
                }),
                fetch(`${getEvn('VITE_API_BASE_URL')}/channels/${channelId}/videos`, {
                    credentials: 'include'
                })
            ]);

            const [channelData, videosData] = await Promise.all([
                channelRes.json(),
                videosRes.json()
            ]);

            if (!channelRes.ok) {
                throw new Error(channelData.message);
            }

            if (!videosRes.ok) {
                throw new Error(videosData.message);
            }

            setChannel(channelData.channel);
            setVideos(videosData.videos);
        } catch (error) {
            showToast('error', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading channel...</div>;
    }

    if (!channel) {
        return <div>Channel not found</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Channel Header */}
            <div className="relative">
                <div className="h-32 bg-gray-200"></div>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-start -mt-8 mb-6">
                        <Avatar className="w-32 h-32 border-4 border-white">
                            <img
                                src={channel.avatar}
                                alt={channel.name}
                                className="object-cover w-full h-full rounded-full"
                            />
                        </Avatar>
                        <div className="ml-6 mt-12">
                            <div className="flex items-center gap-2">
                                <h1 className="text-3xl font-bold">{channel.name}</h1>
                                {channel.isVerified && (
                                    <FaCheckCircle className="text-blue-500 text-xl" />
                                )}
                            </div>
                            <div className="text-gray-600 mt-1">
                                <span>{channel.subscribersCount.toLocaleString()} subscribers</span>
                            </div>
                            <p className="mt-4 text-gray-700">{channel.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Videos Grid */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </div>
                {videos.length === 0 && (
                    <p className="text-center text-gray-500">No videos found</p>
                )}
            </div>
        </div>
    );
};

export default ChannelPage;
