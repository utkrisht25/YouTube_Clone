import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import VideoCard from '@/components/VideoCard';
import { FaCheckCircle } from "react-icons/fa";
import { getEvn } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { useSelector } from 'react-redux';

const ChannelPage = () => {
    const { channelId } = useParams();
    const { isLoggedIn, user } = useSelector(state => state.user);
    const [channel, setChannel] = React.useState(null);
    const [videos, setVideos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isSubscribed, setIsSubscribed] = React.useState(false);
    const [subscribing, setSubscribing] = React.useState(false);

    React.useEffect(() => {
        fetchChannelAndVideos();
        if (isLoggedIn) {
            checkSubscriptionStatus();
        }
    }, [channelId, isLoggedIn]);

    const checkSubscriptionStatus = async () => {
        try {
            const response = await fetch(
                `${getEvn('VITE_API_BASE_URL')}/channels/${channelId}/subscription`,
                { credentials: 'include' }
            );
            const data = await response.json();
            if (response.ok) {
                setIsSubscribed(data.isSubscribed);
            }
        } catch (error) {
            console.error('Error checking subscription:', error);
        }
    };

    const handleSubscribe = async () => {
        if (!isLoggedIn) {
            showToast('error', 'Please sign in to subscribe');
            return;
        }

        try {
            setSubscribing(true);
            const response = await fetch(
                `${getEvn('VITE_API_BASE_URL')}/channels/${channelId}/subscribe`,
                {
                    method: 'POST',
                    credentials: 'include'
                }
            );
            const data = await response.json();
            
            if (!response.ok) throw new Error(data.message);
            
            setIsSubscribed(data.subscribed);
            setChannel(prev => ({
                ...prev,
                subscribersCount: prev.subscribersCount + (data.subscribed ? 1 : -1)
            }));
            showToast('success', data.message);
        } catch (error) {
            showToast('error', error.message);
        } finally {
            setSubscribing(false);
        }
    };

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
                            <Button
                                onClick={handleSubscribe}
                                disabled={subscribing || (isLoggedIn && channel.owner?._id === user?._id)}
                                variant={isSubscribed ? "outline" : "default"}
                                className="mt-4"
                            >
                                {subscribing ? 'Processing...' : isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                            </Button>
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
