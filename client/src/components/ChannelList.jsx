import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from './ui/avatar';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import { FaCheckCircle } from "react-icons/fa";
import { getEvn } from '@/helpers/getEnv';
import defaultLogo from '@/assets/images/favicon_red.png';

const formatSubscribers = (count) => {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
};

const ChannelList = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user } = useSelector(state => state.user);
    const [channels, setChannels] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetchChannels();
    }, []);

    const fetchChannels = async () => {
        try {
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/channels`, {
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setChannels(data.channels);
            }
        } catch (error) {
            console.error('Error fetching channels:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading channels...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {isLoggedIn && (
                <Button 
                    className="mb-6 bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => navigate('/create-channel')}
                >
                    Create Channel
                </Button>
            )}
            
            <div className="space-y-6">
                {channels.map((channel) => (
                    <Link
                        key={channel._id}
                        to={`/channel/${channel._id}`}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Avatar className="w-24 h-24">
                            <img
                                src={ defaultLogo}
                                alt={channel.name}
                                className="object-cover w-fit h-fit rounded-full"
                            />
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-semibold">{channel.name}</h2>
                                {channel.isVerified && (
                                    <FaCheckCircle className="text-blue-500" />
                                )}
                            </div>
                            <p className="text-gray-600 mt-1">
                                {formatSubscribers(channel.subscribersCount)} subscribers
                            </p>
                            <p className="text-gray-600 mt-2 line-clamp-2">
                                {channel.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ChannelList;
