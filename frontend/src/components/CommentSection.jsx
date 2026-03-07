import { useState } from "react";
import api from "../api/axios";

export default function CommentSection({ post, onPostUpdate }) {

    const [text, setText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [activeReplyId, setActiveReplyId] = useState(null); // tracks which comment reply box is open

    const handleComment = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        try {
            const res = await api.post(`/posts/${post._id}/comment`, { text });
            onPostUpdate(post._id, res.data.updatedPost);
            setText("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const res = await api.delete(`/posts/${post._id}/comment/${commentId}`);
            onPostUpdate(post._id, res.data.updatedPost);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddCommentReply = async (postId, commentId) => {
        if (!replyText.trim()) return;
        try {
            const res = await api.post(`/posts/${postId}/comment/${commentId}`, { text: replyText });
            console.log(res.data);
            onPostUpdate(post._id, res.data.updatedPost);
            setReplyText("");
            setActiveReplyId(null); // close reply box after submit
        } catch (error) {
            console.error(error);
        }
    };

    // Add this helper function at the top of your component file
    const timeAgo = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="mt-4">

            {/* Comment Input */}
            <form onSubmit={handleComment} className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                    U
                </div>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 bg-[#1e293b] border border-gray-700 rounded-full px-4 py-2 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                />
            </form>

            {/* Comment List */}
            <div className="space-y-4">
                {post.comments.map((comment) => (
                    <div key={comment._id} className="flex gap-3">

                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                            {comment.user?.name?.[0] || "U"}
                        </div>

                        {/* Comment Body */}
                        <div className="flex-1">

                            {/* Bubble */}
                            <div className="bg-[#1e293b] rounded-xl px-4 py-2">
                                <p className="text-sm font-semibold text-white">
                                    {comment.user?.name || "User"}
                                </p>
                                <p className="text-sm text-gray-300">{comment.text}</p>
                            </div>

                            {/* Comment Actions */}
                            <div className="flex items-center gap-4 text-xs text-gray-400 mt-1 ml-2">
                                <button className="hover:text-white">Like</button>
                                <button
                                    className="hover:text-white"
                                    onClick={() =>
                                        setActiveReplyId(
                                            activeReplyId === comment._id ? null : comment._id
                                        )
                                    }
                                >
                                    Reply
                                </button>

                                {/* Accurate timestamp */}
                                <span>{timeAgo(comment.createdAt)}</span>

                                <button
                                    onClick={() => handleDeleteComment(comment._id)}
                                    className="hover:text-red-400"
                                >
                                    Delete
                                </button>
                            </div>

                            {/* Reply Input */}
                            {activeReplyId === comment._id && (
                                <div className="flex gap-2 mt-2">
                                    <input
                                        type="text"
                                        placeholder="Write a reply..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="flex-1 bg-[#1e293b] border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                                    />
                                    <button
                                        onClick={() => handleAddCommentReply(post._id, comment._id)}
                                        className="px-4 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 rounded-full text-white transition"
                                    >
                                        Send
                                    </button>
                                </div>
                            )}

                            {/* Replies List */}
                            {comment.replies?.length > 0 && (
                                <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-700">
                                    {comment.replies.map((reply) => (
                                        <div key={reply._id} className="flex gap-3">
                                            {console.log(reply)}
                                            {/* Avatar */}
                                            <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                {reply.user?.name?.[0] || "U"}
                                            </div>

                                            {/* Reply Body */}
                                            <div className="flex-1">

                                                {/* Bubble */}
                                                <div className="bg-[#162032] rounded-xl px-4 py-2">
                                                    <p className="text-sm font-semibold text-white">
                                                        {reply.user?.name || "User"}
                                                    </p>
                                                    <p className="text-sm text-gray-300">{reply.text}</p>
                                                </div>

                                                {/* Reply Actions */}
                                                <div className="flex items-center gap-4 text-xs text-gray-400 mt-1 ml-2">
                                                    <button className="hover:text-white">Like</button>
                                                    <span>{timeAgo(reply.createdAt)}</span>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}