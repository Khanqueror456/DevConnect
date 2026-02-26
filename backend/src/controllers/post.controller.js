import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
            const {content, image} = req.body;

            if (!content) {
                return res.status(400).json({message : "Content is required"});
            }

            const post = await Post.create({
                author: req.user._id, // from protect middleware
                content,
                image : image || "",
            });

            res.status(201).json({
                message : "Post created successfully",
                post,
            });

    }catch(error)
    {
        return res.status(500).json({message : error.message});
    }
}

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "name email profilePic").sort({createdAt: -1});
        
        res.json(posts);
    } catch(error)
    {
        res.status(500).json({message : error.message});
    }
}

export const toggleLike = async (req, res) => {
    try {
        const {postId} = req.params;

        const post = await Post.findById(postId);

        if (!post)
        {
            return res.status(404).json({ message : "Post not found"} );
        }

        const userId = req.user._id;

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked)
        {
            post.likes = post.likes.filter(
                (id) => id.toString() !== userId.toString()
            );
        }

        else
        {
            post.likes.push(userId);
        }

        await post.save();

        res.json({
            message : alreadyLiked ? "Post unliked" : "Post liked",
            totalLikes : post.likes.length,
        });
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
};