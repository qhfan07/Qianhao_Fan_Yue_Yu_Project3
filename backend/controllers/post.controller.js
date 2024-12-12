import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ error: "Post must have text" });
        }

        const newPost = new Post({ user: userId, text });
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        console.log("Error in createPost controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate("user", "username"); 

        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getAllPosts controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
  
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log("Error in deletePost controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const posts = await Post.find({ user: user._id })
            .populate("user", "username") 
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getUserPosts controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        post.text = text;
        await post.save();

        const updatedPost = await Post.findById(id).populate("user", "username");

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error in editPost controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


