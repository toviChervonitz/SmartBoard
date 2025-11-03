import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { PostCardProps } from "../models/Post";
import type { favoritePost } from "../models/Post";
import { getFromLocalStorage } from "../services/localstorage";

export default function LikeButton({ post, isLoggedIn, fromPersonalArea, onDelete }: PostCardProps) {
    const user = getFromLocalStorage<any>("userLogin");
    const userId = user?.id || null;

    const favoritePostData: favoritePost = {
        postId: post._id,
        userId,
        liked: false,
        likes: post.likes || 0,
    };

    const [currentPost, setCurrentPost] = useState<favoritePost>(favoritePostData);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (loading) return;
        if (!currentPost.postId) {
            console.error("Post ID is missing!");
            return;
        }

        const oldPost = currentPost;
        const isLiking = !currentPost.liked; // true = מוסיף לייק, false = מוריד לייק

        const updatedPost = {
            ...currentPost,
            liked: isLiking,
            likes: (currentPost.likes ?? 0) + (isLiking ? 1 : -1),
        };

        setCurrentPost(updatedPost);
        setLoading(true);

        try {
            const url = isLiking
                ? `http://localhost:3000/api/posts/addFavoritePost/${currentPost.postId}`
                : `http://localhost:3000/api/posts/removeFavoritePost/${currentPost.postId}`;

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPost),
            });

            if (!response.ok) throw new Error("Failed to update like status");
        } catch (err) {
            console.error("Post update failed:", err);
            setCurrentPost(oldPost);
        } finally {
            setLoading(false);
        }
    };

    if (!isLoggedIn) return null;

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
