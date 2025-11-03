import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { Post } from "../models/Post";

interface LikeButtonProps {
    post: Post;
}

export default function LikeButton({ post }: LikeButtonProps) {
    // מוסיפים liked פנימי אם לא קיים
    const [currentPost, setCurrentPost] = useState<Post & { liked?: boolean }>({
        ...post,
        liked: false,
    });

    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (loading) return;
        if (!currentPost._id) {
            console.error("Post ID is missing!");
            return;
        }

        const oldPost = currentPost;

        const updatedPost = {
            ...currentPost,
            liked: !currentPost.liked, // הפוך את הלייק
            likes: (currentPost.likes ?? 0) + (currentPost.liked ? -1 : 1), // עדכון הלייקים לפי מצב הלייק הקודם
        };

        // עדכון מיידי במסך
        setCurrentPost(updatedPost);
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:3000/api/posts/${currentPost._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPost),
            });

            if (!response.ok) throw new Error("Failed to update post");

            // אפשר להחזיר מהשרת ולעדכן state לפי data
            // const data = await response.json();
            // setCurrentPost(data);

        } catch (err) {
            console.error("Post update failed:", err);
            // rollback במקרה של שגיאה
            setCurrentPost(oldPost);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column-reverse", alignItems: "center", gap: 8 }}>
            <IconButton
                aria-label={currentPost.liked ? "הסר לייק" : "הוסף לייק"}
                onClick={handleClick}
                disabled={loading}
                size="small"
            >
                <FavoriteIcon fontSize="small" color={currentPost.liked ? "error" : "inherit"} />
            </IconButton>

            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {currentPost.likes || 0} לייקים
            </Typography>
        </div>
    );
}
