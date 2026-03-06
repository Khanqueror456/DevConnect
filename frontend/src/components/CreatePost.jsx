import { useState } from "react";
import api from "../api/axios";

export default function CreatePost({ onPostCreated }) {

    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Look at the content", content);

        if (!content.trim()) return;

        try {
            const res = await api.post("/posts", { content });
            console.log(res.data.post._id);
            const res2 = await api.get(`/posts/${res.data.post._id}`);

            const newPost = res2.data;

            console.log("The new post is", newPost);

            // Add new post to feed;
            onPostCreated(newPost);

            setContent("");
        } catch (error) {
            console.error(error);
            alert("Failed to create post");
        }
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 backdrop-blur">
            <form onSubmit={handleSubmit} className="mb-5">
                <textarea
                    placeholder="Share something..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="3"
                    className="w-full bg-transparent outline-none resize-none text-gray-200 placeholder-gray-500"
                />

                <div className="flex justify-end mt-3">

                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium">
                        Post
                    </button>
                </div>
            </form>

        </div>
    );
}