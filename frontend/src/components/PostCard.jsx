import api from "../api/axios";

const PostCard = ({ post, onLikeToggle }) => {

    const handleLike = async () => {
        try {
            const res = await api.put(`/posts/${post._id}/like`);

            onLikeToggle(post._id, res.data.updatedPost);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='border border-gray-400 p-3 mb-3 rounded-md'>
            <h4>{post.author?.name || "User"}</h4>
            <p>{post.content}</p>
            <button onClick={handleLike}>
                {post.isLikedByMe ? "❤️ Liked" : "👍 Like"}
            </button>
            <div className="text-md text-gray-400">
                <span>Likes : {post.likes.length}</span>
                <span className='ml-[10px]'>Comments: {post.comments.length}</span>
            </div>
        </div>
    );
}

export default PostCard;
