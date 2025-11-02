import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import PostCard from "../components/PostCard";
import { getPostById } from "../services/api";
import type { Post } from "../models/Post";
import { getFromLocalStorage } from '../services/localstorage'

export default function PublicPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const user = getFromLocalStorage<string>('userLogin');
    const userId = user ? JSON.parse(user)._id : null;

    const handleDelete = (id: string) => {
        setPosts((prev) => prev.filter((p) => p._id !== id)); // ✅ מסיר מהמסך בלי רענון
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPostById(userId);
                setPosts(data);
            } catch (err) {
                console.error("❌ שגיאה בקבלת פוסטים:", err);
                setError("לא ניתן לטעון את המודעות מהשרת.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

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
                המודעות שלי
            </Typography>
            {posts.length > 0 ? (
                posts.map((p) => <PostCard key={p._id} post={p} isLoggedIn={true} fromPersonalArea={true} onDelete={handleDelete} />)
            ) : (
                <Typography color="text.secondary">אין לך כרגע מודעות באזור האישי</Typography>
            )
            }
        </Container >
    );
}
