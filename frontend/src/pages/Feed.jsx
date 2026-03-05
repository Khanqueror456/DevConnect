import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import CreatePost from "../components/CreatePost";

export default function Feed() {

    const [posts, setPosts] = useState([]);
    const {logout} = useAuth();

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

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    const handleNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div>
            <h1>DevConnect Feed</h1>

            <CreatePost onPostCreated={handleNewPost} />

            {posts.length === 0 ? (
                <p>No posts yet</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="border m-[10px] p-[10px]">
                        <p>{post.content}</p>
                        <p>Likes: {post.likes?.length || 0}</p>
                    </div>
                    
                ))
            )}

            <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:cursor-pointer" onClick={logout}>Logout</button>
        </div>
    );
}