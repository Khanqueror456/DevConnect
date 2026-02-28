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
        const posts = await Post.find().populate("author", "name profilePic").populate("comments.user", "name profilePic").sort({createdAt: -1});
        
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

export const addComent = async (req, res) => {
    try {

        const {postId} = req.params;
        const {text} = req.body;

        if (!text)
        {
            return res.status(400).json({message : "Comment text is required"});
        }

        const post = await Post.findById(postId);

        if (!post)
        {
            return res.status(404).json({message : "Post not found"});
        }

        const newComment = {
            user: req.user._id,
            text,
        };

        post.comments.push(newComment);

        await post.save();

        res.status(201).json({
            message : "Comment added successfully",
            commentsCount : post.comments.length,
        });

    } catch(error){
        res.status(500).json({message : error.message});
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post){
            return res.status(404).json({message : "Post not found"});
        }

        // OwnerShip check
        if (post.author.toString() !== req.user._id.toString()){
            return res.status(403).json({message : "Not authorized to delete this post"});
        }

        await post.deleteOne();

        res.json({ message : "Post deleted successfully"});

    } catch(error){
        res.status(500).json({ message : error.message});
    }
};