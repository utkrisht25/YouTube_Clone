import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RouteSignIn } from '@/helpers/RouteName';
import { getEvn } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';

const CreateChannel = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user } = useSelector(state => state.user);
    const [loading, setLoading] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        description: '',
        avatar: ''
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setUploading(true);
                const formData = new FormData();
                formData.append('file', file);
                
                const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/upload`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                });
                
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                
                setFormData(prev => ({
                    ...prev,
                    avatar: data.fileUrl
                }));
                showToast('success', 'Image uploaded successfully');
            } catch (error) {
                showToast('error', error.message || 'Error uploading image');
            } finally {
                setUploading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            return showToast('error', 'Channel name is required');
        }

        try {
            setLoading(true);
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/channels`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...formData,
                    owner: user._id
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            showToast('success', 'Channel created successfully');
            navigate(`/channel/${data.channel._id}`);
        } catch (error) {
            showToast('error', error.message);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (!isLoggedIn) {
            // Store the intended destination
            sessionStorage.setItem('redirectAfterLogin', '/create-channel');
            navigate(RouteSignIn);
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null; // Don't render anything while redirecting
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <Card className="p-6">
                    <h1 className="text-2xl font-bold mb-6">Create Your Channel</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="channelName">Channel Name *</Label>
                            <Input
                                id="channelName"
                                type="text"
                                placeholder="Enter channel name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    name: e.target.value
                                }))}
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Channel Description</Label>
                            <Input
                                id="description"
                                type="text"
                                placeholder="Tell viewers about your channel"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    description: e.target.value
                                }))}
                            />
                        </div>

                        <div>
                            <Label htmlFor="avatar">Channel Avatar</Label>
                            <Input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="cursor-pointer"
                                disabled={uploading}
                            />
                            {uploading && <p className="mt-2 text-sm text-blue-500">Uploading image...</p>}
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Channel'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default CreateChannel;
