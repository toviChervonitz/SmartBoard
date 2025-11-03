import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import PostCard from "../components/PostCard";
import { getFromLocalStorage } from "../services/localstorage";
import { getPosts } from "../services/api";

export default function PublicPosts() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPosts()
            .then((data) => setPosts(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <CircularProgress />;
    const user = getFromLocalStorage<string>('userLogin');
    const isLoggedIn = user ? true : false;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                כל המודעות
            </Typography>
            {posts.map((p) => (
                <PostCard key={p._id} post={p} isLoggedIn={isLoggedIn} />
            ))}
        </Container>
    );
}
