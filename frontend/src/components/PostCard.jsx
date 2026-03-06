import api from "../api/axios";
import CommentSection from "./CommentSection";

const PostCard = ({ post, onPostUpdate, onDeletePost }) => {

    const handleLike = async () => {
        try {
            const res = await api.put(`/posts/${post._id}/like`);

            onPostUpdate(post._id, res.data.updatedPost);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/posts/${post._id}`);
            onDeletePost(post._id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        // <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 backdrop-blur">
        //     <div className="flex items-center gap-3 mb-3">
        //     <div>
        //         <p className="font-semibold">{post.author?.name || "User"}</p>
        //     </div>
        //     </div>
        //     <p className="text-gray-300 mb-4">{post.content}</p>
        //     <button onClick={handleLike}>
        //         {post.isLikedByMe ? "❤️ Liked" : "👍 Like"}
        //     </button>
        //     <button onClick={handleDelete} className="ml-2.5">🗑 Delete</button>
        //     <div className="text-md text-gray-400">
        //         <span className="hover:text-white">Likes : {post.likes.length}</span>
        //         <span className='ml-[10px] hover:text-white'>Comments: {post.comments.length}</span>
        //     </div>
        //     <CommentSection post={post} onPostUpdate={onPostUpdate} />
        // </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 backdrop-blur-md shadow-lg hover:border-blue-500/30 transition">

            {/* Author Section */}
            <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                    {post.author?.name?.[0] || "U"}
                </div>

                <div className="flex flex-col">
                    <p className="font-semibold text-white">
                        {post.author?.name || "User"}
                    </p>

                    <span className="text-xs text-gray-400">
                        Developer
                    </span>
                </div>

            </div>

            {/* Post Content */}
            <p className="text-gray-300 leading-relaxed mb-4">
                {post.content}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-3 text-sm">

                <button
                    onClick={handleLike}
                    className={`px-3 py-1.5 rounded-lg transition ${post.isLikedByMe
                            ? "bg-red-500/20 text-red-400"
                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                >
                    {post.isLikedByMe ? "❤️ Liked" : "👍 Like"}
                </button>

                <button
                    onClick={handleDelete}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition"
                >
                    🗑 Delete
                </button>

            </div>

            {/* Stats */}
            <div className="flex gap-6 text-sm text-gray-400 border-t border-white/10 pt-3 mb-3">

                <span className="hover:text-white transition cursor-pointer">
                    👍 {post.likes.length} Likes
                </span>

                <span className="hover:text-white transition cursor-pointer">
                    💬 {post.comments.length} Comments
                </span>

            </div>

            {/* Comments */}
            <CommentSection post={post} onPostUpdate={onPostUpdate} />

        </div>
    );
}

export default PostCard;
