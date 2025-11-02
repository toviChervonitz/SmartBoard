import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Post = {
    id?: string | number;
    likes?: number;
    liked?: boolean;
};

interface LikeButtonProps {
    post?: Post;
}

export default function LikeButton({ post = {} }: LikeButtonProps) {
    const initialLikes = typeof post.likes === "number" ? post.likes : 0;
    const [liked, setLiked] = useState(post.liked || false);
    const [likes, setLikes] = useState(initialLikes);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (loading) return;

        const newLiked = !liked;
        const diff = newLiked ? 1 : -1;

        // optimistic update
        setLiked(newLiked);
        setLikes((l) => l + diff);
        setLoading(true);

        try {
            // 🔹 קריאה פיקטיבית ל־API (שנה לכתובת שלך)
            const response = await fetch(`http://localhost:3000/like/${post.id}`, {
                method: newLiked ? "POST" : "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("API request failed");

            // אופציונלי: לעדכן לפי תשובת השרת
            const data = await response.json();
            if (typeof data.likes === "number") setLikes(data.likes);
        } catch (err) {
            console.error("onLike failed:", err);
            // rollback on error
            setLiked(!newLiked);
            setLikes((l) => l - diff);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div style={{ display: "flex", flexDirection: "column-reverse", alignItems: "center", gap: 8 }}>
            <IconButton
                aria-label={liked ? "הסר לייק" : "הוסף לייק"}
                onClick={handleClick}
                disabled={loading}
                size="small"
            >
                <FavoriteIcon fontSize="small" color={liked ? "error" : "inherit"} />
            </IconButton>

            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {likes} לייקים
            </Typography>
        </div>
    );
}
