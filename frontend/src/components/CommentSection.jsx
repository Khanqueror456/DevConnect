import { useState } from "react";
import api from "../api/axios";

export default function CommentSection({ post, onPostUpdate }) {

    const [text, setText] = useState("");

    const handleComment = async (e) => {
        e.preventDefault();

        if (!text.trim()) return;

        try {
            const res = await api.post(`/posts/${post._id}/comment`, {
                text,
            });
            console.log("Post from comment section", res.data.updatedPost);
            onPostUpdate(post._id, res.data.updatedPost);

            setText("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const res = await api.delete(
                `/posts/${post._id}/comment/${commentId}`
            );

            onPostUpdate(post._id, res.data.updatedPost);
        } catch (error) {
            console.error(error);
        }
    };

    return (

        // <div className="mt-4">

        //     {/* Comment Input */}
        //     <form onSubmit={handleComment} className="flex gap-3 mb-4">

        //         {/* Avatar */}
        //         <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
        //             U
        //         </div>

        //         <input
        //             type="text"
        //             placeholder="Add a comment..."
        //             value={text}
        //             onChange={(e) => setText(e.target.value)}
        //             className="flex-1 bg-[#1e293b] border border-gray-700 rounded-full px-4 py-2 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
        //         />

        //     </form>

        //     {/* Comment List */}
        //     <div className="space-y-4">

        //         {post.comments.map((comment) => (

        //             <div key={comment._id} className="flex gap-3">

        //                 {/* Avatar */}
        //                 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
        //                     {comment.user?.name?.[0] || "U"}
        //                 </div>

        //                 {/* Comment Body */}
        //                 <div className="flex-1">

        //                     {/* Bubble */}
        //                     <div className="bg-[#1e293b] rounded-xl px-4 py-2">

        //                         <p className="text-sm font-semibold text-white">
        //                             {comment.user?.name || "User"}
        //                         </p>

        //                         <p className="text-sm text-gray-300">
        //                             {comment.text}
        //                         </p>

        //                     </div>

        //                     {/* Comment Actions */}
        //                     <div className="flex items-center gap-4 text-xs text-gray-400 mt-1 ml-2">

        //                         <button className="hover:text-white">
        //                             Like
        //                         </button>

        //                         <button className="hover:text-white">
        //                             Reply
        //                         </button>

        //                         <span>
        //                             1h
        //                         </span>

        //                         <button
        //                             onClick={() => handleDeleteComment(comment._id)}
        //                             className="hover:text-red-400"
        //                         >
        //                             Delete
        //                         </button>

        //                     </div>

        //                 </div>

        //             </div>

        //         ))}

        //     </div>

        // </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
            {/* Comment Input Form */}
            <form onSubmit={handleComment} className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                    {/* Dynamic current user initial */}
                    {post.author.name[0].toUpperCase()}
                </div>
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 px-4 py-2 text-sm bg-gray-700 text-white border border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
                />
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Post
                </button>
            </form>

            {/* Comments List */}
            <div className="flex flex-col gap-3">
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                        <div key={comment._id} className="flex items-start gap-3 bg-gray-700 p-3 rounded-lg group border border-gray-600">

                            {/* Avatar Initial */}
                            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 mt-0.5">
                                {(comment.user?.name || "U")[0].toUpperCase()}
                            </div>

                            <div className="flex-1 flex flex-col gap-1">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-white text-sm">
                                            {comment.user?.name || "User"}
                                        </span>
                                        {/* Optional: Add timestamp if available */}
                                        <span className="text-xs text-gray-400">5m ago</span>
                                    </div>

                                    {/* Delete Button (Shows on Hover) */}
                                    <button
                                        onClick={() => handleDeleteComment(comment._id)}
                                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 hover:bg-red-900/50 rounded transition-all"
                                        title="Delete comment"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>

                                <p className="text-sm text-gray-200 break-words leading-relaxed">
                                    {comment.text}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    /* Empty State */
                    <p className="text-sm text-gray-400 text-center py-4 italic">
                        No comments yet.
                    </p>
                )}
            </div>
        </div>
    )
}