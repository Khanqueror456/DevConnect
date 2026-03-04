import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Feed() {

    const [posts, setPosts] = useState([]);

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

    return (
        <div>
            <h1>Feed</h1>
            {posts.length === 0 ? (
                <p>No posts yet</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="border m-[10px] p-[10px]">
                        <p>{}post.content</p>
                        <p>Likes: {post.likes.length}</p>
                    </div>
                    
                ))
            )}
        </div>
    );
}