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
        <div className='border border-gray-400 p-3 mb-3 rounded-md'>
            <h4>{post.author?.name || "User"}</h4>
            <p>{post.content}</p>
            <button onClick={handleLike}>
                {post.isLikedByMe ? "❤️ Liked" : "👍 Like"}
            </button>
            <button onClick={handleDelete} className="ml-2.5">🗑 Delete</button>
            <div className="text-md text-gray-400">
                <span>Likes : {post.likes.length}</span>
                <span className='ml-[10px]'>Comments: {post.comments.length}</span>
            </div>
            <CommentSection post={post} onPostUpdate={onPostUpdate} />
        </div>
    );
}

export default PostCard;
