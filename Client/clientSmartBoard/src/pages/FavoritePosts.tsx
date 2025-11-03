import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import PostCard from "../components/PostCard";
import type { Post } from "../models/Post";
import { getFromLocalStorage } from "../services/localstorage";
import axios from "axios";

export default function FavoritePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const user = getFromLocalStorage<any>("userLogin");
    const userId = user?.id || user?._id || null;

    const handleDelete = (id: string) => {
        setPosts((prev) => prev.filter((p) => p._id !== id));
    };

    useEffect(() => {
        if (!userId) {
            setError("משתמש לא מזוהה. אנא התחבר מחדש.");
            setLoading(false);
            return;
        }

        const fetchFavoritePosts = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/posts/getAllFavoritePosts`,
                    { params: { userId } }
                );

                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    console.warn("⚠️ פורמט נתונים לא צפוי מהשרת:", response.data);
                    setPosts([]);
                }
            } catch (err: any) {
                console.error("❌ שגיאה בקבלת פוסטים אהובים:", err);
                if (err.response && err.response.status === 404) {
                    setPosts([]);
                } else {
                    setError("לא ניתן לטעון את רשימת המועדפים כרגע.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFavoritePosts();
    }, [userId]);

    if (loading)
        return (
            <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Container>
        );

    if (error)
        return (
            <Container sx={{ mt: 4 }}>
                <Typography color="error" variant="body1">
                    {error}
                </Typography>
            </Container>
        );

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                הפוסטים שאהבתי ❤️
            </Typography>

            {posts.length > 0 ? (
                posts.map((p) => (
                    <PostCard
                        key={p._id}
                        post={p}
                        isLoggedIn={true}
                        fromPersonalArea={false}
                        onDelete={handleDelete}
                    />
                ))
            ) : (
                <Typography color="text.secondary">
                    אין לך כרגע פוסטים מועדפים.
                </Typography>
            )}
        </Container>
    );
}