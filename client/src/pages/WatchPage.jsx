import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEvn } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';

const WatchPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [likes, setLikes] = useState(0); // Client-side state; persist to DB if needed
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    fetchVideo();
  }, [videoId]);

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

  const handleLike = () => setLikes(likes + 1); // TODO: PATCH to backend
  const handleDislike = () => setDislikes(dislikes + 1); // TODO: PATCH to backend

  if (loading) return <div>Loading...</div>;
  if (!video) return <div>Video not found</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <video controls className="w-full rounded-lg" src={video.videoUrl}>
        Your browser does not support the video tag.
      </video>
      <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
      <p className="text-gray-600 mt-2">{video.description}</p>
      <div className="flex items-center mt-4">
        <img src={video.channel.avatar || 'default-avatar.png'} alt={video.channel.name} className="w-10 h-10 rounded-full" />
        <span className="ml-3 font-medium">{video.channel.name}</span>
      </div>
      <div className="flex gap-4 mt-4">
        <button onClick={handleLike} className="bg-blue-500 text-white px-4 py-2 rounded">Like ({likes})</button>
        <button onClick={handleDislike} className="bg-red-500 text-white px-4 py-2 rounded">Dislike ({dislikes})</button>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded mt-2"
        />
        <button onClick={handleAddComment} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Post</button>
        <div className="mt-4 space-y-4">
          {video.comments?.map((comment) => (
            <div key={comment._id} className="border-b pb-2">
              {editingCommentId === comment._id ? (
                <>
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <button onClick={() => handleEditComment(comment._id)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Save</button>
                  <button onClick={() => setEditingCommentId(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                </>
              ) : (
                <>
                  <p>{comment.content}</p>
                  <div className="text-sm text-gray-500">
                    {comment.user?.name || 'Anonymous'} • {new Date(comment.createdAt).toLocaleString()}
                  </div>
                  <button onClick={() => { setEditingCommentId(comment._id); setEditingContent(comment.content); }} className="text-blue-500 mr-2">Edit</button>
                  <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500">Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
