import { useState } from "react";
import api from "../api/axios";

export default function CreatePost({ onPostCreated }) {

    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        try {
            const res = await api.post("/posts", { content });

            // Add new post to feed;
            onPostCreated(res.data.post);

            setContent("");
        } catch(error) {
            console.error(error);
            alert("Failed to create post");
        }
    };

    return (

        <form onSubmit={handleSubmit} className="mb-5">
            <textarea
                placeholder="Share something..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="3"
                className="w-full"
            />

            <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:cursor-pointer" type="submit">Post</button>
        </form>
    );
}