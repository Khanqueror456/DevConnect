import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const { content, image } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const post = await Post.create({
            author: req.user._id, // from protect middleware
            content,
            image: image || "",
        });

        res.status(201).json({
            message: "Post created successfully",
            post,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id;
        const post = await Post.findById(postId).populate("author", "name profilePic").populate("comments.user", "name profilePic");
        const isLikedByMe = post.likes.some(
                (id) => id.toString() === userId.toString()
            );
        res.json({...post, isLikedByMe});
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPosts = async (req, res) => {
    try {

        // Pagination logic added

        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const userId = req.user._id;

        const totalPosts = await Post.countDocuments();

        const posts = await Post.find().populate("author", "name profilePic").populate("comments.user", "name profilePic").sort({ createdAt: -1 }).skip(skip).limit(limit);

        // 🔥 Add isLikedByMe flag
        const postsWithLikeFlag = posts.map((post) => {
            const isLikedByMe = post.likes.some(
                (id) => id.toString() === userId.toString()
            );

            return {
                ...post.toObject(),
                isLikedByMe,
            };
        });

        res.json({
            currentPage: page,
            totalPage: Math.ceil(totalPosts / limit),
            totalPosts,
            posts: postsWithLikeFlag,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // OwnerShip check
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this post" });
        }

        await post.deleteOne();

        res.json({ message: "Post deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleLike = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userId = req.user._id;

        const alreadyLiked = post.likes.some(
            (id) => id.toString() === userId.toString()
        );

        let updatedPosts;

        if (alreadyLiked) {
            // 🔥 Unlike using $pull
            updatedPosts = await Post.findByIdAndUpdate(
                postId,
                { $pull: { likes: userId } },
                { returnDocument: "after" }
            );
        }

        else {
            // 🔥 Like using $addToSet (prevents duplicates)

            updatedPosts = await Post.findByIdAndUpdate(
                postId,
                { $addToSet: { likes: userId } },
                { returnDocument: "after" }
            );

        }

        let updatedPost = await Post.findById(postId).populate("author", "name profilePic").populate("comments.user", "name profilePic");

        const isLikedByMe = updatedPost.likes.some(
                (id) => id.toString() === userId.toString()
            );

            console.log(updatedPost);
        updatedPost = {...updatedPost.toObject(), isLikedByMe};


        res.json({
            message: alreadyLiked ? "Post unliked" : "Post liked",
            updatedPost,
            totalLikes: updatedPosts.likes.length,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addComent = async (req, res) => {
    try {

        const { postId } = req.params;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = {
            user: req.user._id,
            text,
        };

        post.comments.push(newComment);

        await post.save();

        res.status(201).json({
            message: "Comment added successfully",
            commentsCount: post.comments.length,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {

    try {
        const { postId, commentId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = post.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // 🔐 Ownership Check
        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this comment" });
        }

        // 🔥 Remove subdocument
        comment.deleteOne();

        await post.save();

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};