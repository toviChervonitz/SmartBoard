import { useEffect, useState } from "react";
import {
    Container, Typography,
    Grid, Paper, Alert, Fab, Box,
    Skeleton
} from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
import PostCard from "../components/PostCard";
import { getPostById } from "../services/api";
import type { Post } from "../models/Post";
import { getFromLocalStorage } from '../services/localstorage';
import { useNavigate } from "react-router-dom";

interface User {
    _id: string;
    name: string;
}

export default function MyPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const user = getFromLocalStorage<User>('userLogin');
    const userId = user?.id || null;
    console.log(userId + "userId");


    const handleDelete = (id: string) => {
        setPosts((prev) => prev.filter((p) => p._id !== id));
    };

    useEffect(() => {
        if (!userId) {
            setError("משתמש לא מזוהה. אנא התחבר מחדש.");
            setLoading(false);
            return;
        }
        
        const fetchPosts = async () => {
            try {
                const data = await getPostById(userId);
                console.log("data" + data);
                setPosts(data);
            } catch (err:any) {
                console.error("❌ שגיאה בקבלת פוסטים:", err);
                if (err.response?.status === 404) {
                    setPosts([]);
                } else {
                    setError("לא ניתן לטעון את המודעות מהשרת.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userId]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    המודעות שלי
                </Typography>
                <Grid container spacing={3}>
                    {[1, 2, 3].map((n) => (
                        <Grid item xs={12} key={n}>
                            <Paper sx={{ p: 3 }}>
                                <Skeleton variant="text" width="60%" height={40} />
                                <Skeleton variant="text" width="40%" />
                                <Skeleton variant="rectangular" height={100} sx={{ my: 2 }} />
                                <Skeleton variant="text" width="20%" />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Alert severity="error" variant="filled" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, position: 'relative', minHeight: '80vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    המודעות שלי
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {posts.length} מודעות
                </Typography>
            </Box>

            {posts.length > 0 ? (
                <Grid container spacing={3}>
                    {posts.map((post) => (
                        <Grid item xs={12} key={post._id}>
                            <PostCard
                                post={post}
                                isLoggedIn={true}
                                fromPersonalArea={true}
                                onDelete={handleDelete}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper sx={{ 
                    p: 4, 
                    textAlign: 'center',
                    backgroundColor: 'background.default'
                }}>
                    <Typography color="text.secondary" paragraph>
                        אין לך כרגע מודעות באזור האישי
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        לחץ על כפתור ה+ למטה כדי ליצור מודעה חדשה
                    </Typography>
                </Paper>
            )}

            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                }}
                onClick={() => navigate('/add-post')}
            >
                <AddIcon />
            </Fab>
        </Container>
    );
}
