import { useState } from "react";
import api from "../api/axios";

export default function CommentSection ({ post, onPostUpdate}) {

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
        <div className="mt-[10px]">
            <form onSubmit={handleComment}>
                <input
                type="text"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-[70%]"
                />

                <button type="submit">Comment</button>
            </form>

            <div className="mt-[10px]">
                {post.comments.map((comment) => (
                    <div key={comment._id} className="text-md">
                        <b>{comment.user?.name || "User"}:</b><span>{comment.text}</span>

                        <button className="ml-2" onClick={() => handleDeleteComment(comment._id)}>❌</button>
                    </div>
                ))}
            </div>
        </div>
    )
}