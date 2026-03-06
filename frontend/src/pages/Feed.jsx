import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

export default function Feed() {

    const [posts, setPosts] = useState([]);
    const { logout } = useAuth();

    const fetchPosts = async () => {
        try {
            const res = await api.get("/posts?page=1&limit=10");
            console.log("Posts:", res.data);
            setPosts(res.data.posts);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const handlePostUpdate = (postId, updatedPost) => {
        setPosts((prevPosts) =>
            prevPosts.map((p) =>
                p._id === postId
                    ? updatedPost
                    : p
            )
        );
    };

    return (
        <div className="max-w-[600px] mx-auto">
            <h1>DevConnect Feed</h1>

            <CreatePost onPostCreated={handleNewPost} />

            {posts.length === 0 ? (
                <p>No posts yet</p>
            ) : (
                posts.map((post) => (
                    <PostCard 
                    key={post._id} 
                    post={post} 
                    onPostUpdate={handlePostUpdate}
                    />

                ))
            )}

            <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:cursor-pointer" onClick={logout}>Logout</button>
        </div>
    );
}