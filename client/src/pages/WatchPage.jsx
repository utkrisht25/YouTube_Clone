import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEvn } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { formatDistance } from 'date-fns';

const WatchPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userInteraction, setUserInteraction] = useState(null); // 'like' or 'dislike' or null
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    fetchVideo();
    fetchRecommendedVideos();
  }, [videoId]);

  const fetchRecommendedVideos = async () => {
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/videos`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        return showToast('error', data.message);
      }
      // Filter out the current video and get only 10 videos
      const filtered = data.videos.filter(v => v._id !== videoId).slice(0, 10);
      setRecommendedVideos(filtered);
    } catch (error) {
      showToast('error', error.message);
    }
  };

  const fetchVideo = async () => {
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/videos/${videoId}`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        return showToast('error', data.message);
      }
      setVideo(data.video);
      setLikes(data.video.likes || 0);
      setDislikes(data.video.dislikes || 0);
    } catch (error) {
      showToast('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/comments`, {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ videoId, content: newComment }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setVideo((prev) => ({ ...prev, comments: [data.comment, ...prev.comments] }));
      setNewComment('');
      showToast('success', 'Comment added!');
    } catch (error) {
      showToast('error', error.message);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editingContent.trim()) return;
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/comments/${commentId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editingContent }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setVideo((prev) => ({
        ...prev,
        comments: prev.comments.map((c) => (c._id === commentId ? data.comment : c)),
      }));
      setEditingCommentId(null);
      setEditingContent('');
      showToast('success', 'Comment updated!');
    } catch (error) {
      showToast('error', error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/comments/${commentId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setVideo((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== commentId),
      }));
      showToast('success', 'Comment deleted!');
    } catch (error) {
      showToast('error', error.message);
    }
  };

  const handleLike = async () => {
    try {
      if (userInteraction === 'like') {
        setUserInteraction(null);
        setLikes(prev => prev - 1);
      } else {
        if (userInteraction === 'dislike') {
          setDislikes(prev => prev - 1);
        }
        setUserInteraction('like');
        setLikes(prev => prev + 1);
      }
      // TODO: Update backend when API is ready
      // await fetch(`${getEvn('VITE_API_BASE_URL')}/videos/${videoId}/like`, ...);
    } catch (error) {
      showToast('error', error.message);
    }
  };

  const handleDislike = async () => {
    try {
      if (userInteraction === 'dislike') {
        setUserInteraction(null);
        setDislikes(prev => prev - 1);
      } else {
        if (userInteraction === 'like') {
          setLikes(prev => prev - 1);
        }
        setUserInteraction('dislike');
        setDislikes(prev => prev + 1);
      }
      // TODO: Update backend when API is ready
      // await fetch(`${getEvn('VITE_API_BASE_URL')}/videos/${videoId}/dislike`, ...);
    } catch (error) {
      showToast('error', error.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  if (!video) return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
      Video not found
    </div>
  );

  return (
    <div className="p-4 max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <video 
            controls 
            className="w-full rounded-lg bg-black aspect-video" 
            src={video.videoUrl}
          >
            Your browser does not support the video tag.
          </video>
          <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <img 
                src={video.channel.avatar || '/default-avatar.png'} 
                alt={video.channel.name} 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <span className="font-medium block">{video.channel.name}</span>
                <span className="text-sm text-gray-500">{video.channel.subscribersCount || 0} subscribers</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleLike} 
                className={`flex items-center gap-1 px-4 py-2 rounded-full ${
                  userInteraction === 'like' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <ThumbsUp className={userInteraction === 'like' ? 'fill-current' : ''} size={20} />
                <span>{likes}</span>
              </button>
              <button 
                onClick={handleDislike} 
                className={`flex items-center gap-1 px-4 py-2 rounded-full ${
                  userInteraction === 'dislike' 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <ThumbsDown className={userInteraction === 'dislike' ? 'fill-current' : ''} size={20} />
                <span>{dislikes}</span>
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-4 p-4 bg-gray-50 rounded-lg">{video.description}</p>
          
          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              rows="3"
            />
            <button 
              onClick={handleAddComment} 
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
            >
              Post
            </button>
            
            <div className="mt-6 space-y-4">
              {video.comments?.length === 0 ? (
                <p className="text-gray-500">No comments yet. Be the first!</p>
              ) : (
                video.comments?.map((comment) => (
                  <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
                    {editingCommentId === comment._id ? (
                      <>
                        <textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="mt-2 space-x-2">
                          <button 
                            onClick={() => handleEditComment(comment._id)} 
                            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                          >
                            Save
                          </button>
                          <button 
                            onClick={() => setEditingCommentId(null)} 
                            className="bg-gray-500 text-white px-4 py-1 rounded-lg hover:bg-gray-600 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <img 
                            src={comment.user?.avatar || '/default-avatar.png'} 
                            alt={comment.user?.username} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <span className="font-medium">{comment.user?.username || 'Anonymous'}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              {comment.createdAt && (() => {
                                try {
                                  return formatDistance(new Date(comment.createdAt), new Date(), { addSuffix: true });
                                } catch (error) {
                                  return '';
                                }
                              })()}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                        <div className="mt-2 space-x-2">
                          <button 
                            onClick={() => { 
                              setEditingCommentId(comment._id); 
                              setEditingContent(comment.content); 
                            }} 
                            className="text-blue-500 hover:text-blue-600 text-sm"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteComment(comment._id)} 
                            className="text-red-500 hover:text-red-600 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recommended Videos Sidebar */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Recommended Videos</h2>
          <div className="space-y-4">
            {recommendedVideos.map((recommendedVideo) => (
              <Link 
                key={recommendedVideo._id} 
                to={`/watch/${recommendedVideo._id}`}
                className="flex gap-2 hover:bg-gray-100 p-2 rounded-lg transition"
              >
                <img 
                  src={recommendedVideo.thumbnailUrl} 
                  alt={recommendedVideo.title}
                  className="w-40 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-2">{recommendedVideo.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{recommendedVideo.channel?.name}</p>
                  <p className="text-xs text-gray-500">
                    {recommendedVideo.views} views
                    {recommendedVideo.createdAt && ' • '}
                    {recommendedVideo.createdAt && (() => {
                      try {
                        return formatDistance(new Date(recommendedVideo.createdAt), new Date(), { addSuffix: true });
                      } catch (error) {
                        return '';
                      }
                    })()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
