const favorites = require("../models/favorites");
const Post = require("../models/Post");

// פונקציה שמבריחה תווי RegExp מסוכנים מהחיפוש (כדי למנוע תקלות/הזרקה)
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

exports.getAllPosts = async (req, res) => {
    try {
        const { q } = req.query;

        let filter = {};
        if (q && q.trim()) {
            const regex = new RegExp(escapeRegex(q.trim()), 'i'); // case-insensitive
            filter = {
                $or: [
                    { title: { $regex: regex } },
                    { location: { $regex: regex } },
                ]
            };
        }

        const posts = await Post.find(filter).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllFavoritePosts = async (req, res) => {
    try {
        console.log("Fetching favorite posts for user:", req.query.userId);
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ error: "userId query parameter is required" });
        }
        console.log("User ID:", userId);
        console.log("Finding favorites for user ID:", userId);
        const userFavorites = await favorites.findOne({ userId }).populate('favoritePosts');
        if (!userFavorites) {
            return res.status(200).json([]);
        }
        console.log("Favorite posts found:", userFavorites.favoritePosts);
        res.status(200).json(userFavorites.favoritePosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const saved = await newPost.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.addFavoritePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        const favoritePosts = await favorites.findOneAndUpdate(
            { userId: req.body.userId },
            { $addToSet: { favoritePosts: req.params.id } },
            { new: true, upsert: true }
        );
        res.json({ post: updatedPost, favorites: favoritePosts });
    } catch (err) {
        console.log("error liking post:", err);
        res.status(400).json({ error: err.message });
    }
};

exports.removeFavoritePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: -1 } },
            { new: true }
        );
        const favoritePosts = await favorites.findOneAndUpdate(
            { userId: req.body.userId },
            { $pull: { favoritePosts: req.params.id } },
            { new: true }
        );
        res.json({ post: updatedPost, favorites: favoritePosts });
    } catch (err) {
        console.log("error unliking post:", err);
        res.status(400).json({ error: err.message });
    }
};
