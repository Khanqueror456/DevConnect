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
            
            onPostUpdate(post._id, res.data.post);

            setText("");
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
                        <b>{comment.user?.name || "User"}:</b> {comment.text}
                    </div>
                ))}
            </div>
        </div>
    )
}