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

exports.getPostsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error("❌ Error fetching user posts:", error.message);
        res.status(500).json({ message: "Error fetching user's posts" });
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
    console.log("1234556789");
    console.log("new post" + req.body);
    try {
        const newPost = new Post(req.body);
        const saved = await newPost.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error("❌ Error creating post:", err.message);
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